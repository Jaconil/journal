var pkg = require('../../package.json');

module.exports = function(grunt) {

  grunt.config.set('shipit', {
    default: {
      repositoryUrl: pkg.repository.url,
      keepReleases: 3,
      servers: 'maxime-guihal.com',
      linkedFiles: [
        'config/local.js'
      ]
    },
    prod: {
      workspace: '.deploy/prod',
      deployTo: pkg.name
    },
    dev: {
      workspace: '.deploy/dev',
      deployTo: 'dev/' + pkg.name,
      branch: 'wip'
    }
  });

  grunt.loadNpmTasks('grunt-shipit');
  grunt.loadNpmTasks('shipit-deploy');
  grunt.loadNpmTasks('shipit-shared');

  grunt.registerTask('app:install', 'app install', function () {
    grunt.shipit.remote(
      'cd ' + grunt.shipit.releasePath + ' && npm install && npm run postinstall',
    this.async());
  });

  grunt.registerTask('app:start', 'app start', function () {
    grunt.shipit.remote(
      'cd ' + grunt.shipit.releasePath + ' && npm start',
    this.async());
  });

  grunt.shipit.on('updated', function () {
    grunt.task.run(['app:install']);
  });

  grunt.shipit.on('published', function() {
    grunt.task.run(['app:start']);
  });

};
