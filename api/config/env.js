// Verify appropriate env variables are present before starting app
import Joi from 'joi';

const Variables = {
  values: {
    LNM_API_KEY: process.env.LNM_API_KEY,
  },
  schemas: {
    LNM_API_KEY: Joi.required(),
  },
};

Joi.validate(Variables.values, Variables.schemas, err => {
  if (err) {
    console.error(err);
  }
});

// Make env variable logic testable by wrapping in functions
export function getServerConnection() {
  return {
    port: parseInt(process.env.PORT, 10) || 8000,
    host: '0.0.0.0',
  };
}

