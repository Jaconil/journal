/**
 * A grunt task to keep directories in sync. It is very similar to grunt-contrib-copy
 * but tries to copy only those files that has actually changed.
 *
 * ---------------------------------------------------------------
 *
 * Synchronize files from the `assets` folder to `.tmp/public`,
 * smashing anything that's already there.
 *
 * For usage docs see:
 * 		https://github.com/tomusdrw/grunt-sync
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sync', {
    src: {
      files: [{
        expand: true,
        cwd: 'src/components',
        src: ['*'],
        dest: '.tmp/public/components'
      }, {
        expand: true,
        cwd: 'src/js',
        src: ['*'],
        dest: '.tmp/public/js'
      }]
    },
    assets: {
      files: [{
        expand: true,
        cwd: 'public',
        src: ['**/*'],
        dest: '.tmp/public'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-sync');
};
