// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: `ADMIN_OVERSTOCK_BACKEND_${process.env.NODE_ENV}`,
      script: './dist/src/main.js',
      watch: true,
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      ignore_watch: ['node_modules', 'uploads'],
      watch_options: {
        followSymlinks: false,
      },
    },
  ],
};
