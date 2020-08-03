import process from 'process';

import { Keys } from '../server';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod') as Keys;
} else {
  module.exports = require('./dev') as Keys;
}

// export const mongoURI =
//   'mongodb+srv://myuser:k41mrIRzZiSEGsEc@cluster0.8rshs.mongodb.net/emailly?retryWrites=true&w=majority';

// export const googleClientID =
//   '388810408806-d92ubd09va3suo9uv7uogv8u5v0egsd0.apps.googleusercontent.com';

// export const googleClientSecret = 'nwyL7bX72dqOGVBHOd2HfAMb';
