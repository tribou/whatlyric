// Search controller
const Joi = require('joi');
const Boom = require('boom');
const searchArtistOrTitle = require('../services/lyricsnmusic.js')
  .searchArtistOrTitle;

// Search response payload validation
// Not only will it error check request and response payloads
// but it will enable auto-generation of swagger documentation
const searchResponseValidation = {
  schema: Joi.object().keys({
    // array in a data property where each item in array is:
    data: Joi.array().items(Joi.object().keys({
      artist: Joi.object().keys({
        name: Joi.string().required(),
      }),
      title: Joi.string().required(),
      snippet: Joi.string().required(),
    })),
  }),
  options: {
    stripUnknown: true,
  },
};

export const search = {

  description: 'Search for matching artist name or track title',
  tags: ['api'],

  handler: (request, reply) => {
    searchArtistOrTitle(request.query.q, (err, data) => {
      if (err) {
        request.log(['search', 'error'], { error: err });
        return reply(Boom.badRequest(err));
      }

      request.log(['search', 'count'], { count: data.length });
      reply({ data: data });
    });
  },

  // Validate the query params
  validate: {
    query: {
      q: Joi.string().required(),
    },
  },

  // Validate the response
  response: searchResponseValidation,
};

