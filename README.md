# WHATLYRIC
[![Build Status](https://travis-ci.org/tribou/whatlyric.svg?branch=master)](https://travis-ci.org/tribou/whatlyric)

Find the lyrics for the songs you love.

<img src="https://raw.githubusercontent.com/wiki/tribou/whatlyric/whatlyric.gif" alt="WhatLyric" style="width: 200px" />

WHATLYRIC is an example song and artist search built in React, Flux, and Hapi.  It also features tests written with [lab](https://github.com/hapijs/lab) and [sinon](https://github.com/sinonjs/sinon) instead of the usual [Jest](https://github.com/facebook/jest).

#### Quick Start

First, grab an API key from Lyrics n' Music [here](http://www.lyricsnmusic.com/api_keys/new).

Then open a terminal session, and run the following commands:

```bash
# Make the API key available to the app with the following env variable:
export LNM_API_KEY='yourkeyhere'

# Install dependencies
npm install

# Build the assets
npm run build

# Start the app
npm start
```

The app defaults to http://localhost:8000.

API documentation is generated at http://localhost:8000/documentation.

#### Testing

```bash
# Run default tests
npm test

# Generate a test coverage report
# Since babel transpiles before tests are run, the line numbers
# reflect the code in this test coverage report
npm run test-cov-html

# Auto-restart tests upon code changes
npm run watch-test

# Auto-restart tests and coverage report upon code changes
npm run watch-test-cov
```

