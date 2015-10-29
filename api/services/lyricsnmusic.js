const request = require('superagent');
const baseUrl = `http://api.lyricsnmusic.com/songs?api_key=${process.env.LNM_API_KEY}`;

export function searchArtistOrTitle(query, callback) {
  request.get(`${baseUrl}&q=${query}&per_page=5`)
    .set('Accept', 'application/json')
    .end((err, response) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, response.body);
    });
}

