/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

  grunt.config.set('copy', {
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

  grunt.loadNpmTasks('grunt-contrib-copy');
};
