module.exports = {
  apps: [
    {
      name: 'h5-editor-server',
      script: './index.js',
      watch: true,
      // Delay between restart
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'db', 'static/img', 'static/covers'],
    },
  ],
};
