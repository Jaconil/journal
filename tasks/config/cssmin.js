/**
 * Compress CSS files.
 *
 * ---------------------------------------------------------------
 *
 * Minifies css files and places them into .tmp/public/min directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-cssmin
 */
module.exports = function(grunt) {

  grunt.config.set('cssmin', {
    build: {
      files: {
        '.tmp/public/styles/dist/main.min.css': ['.tmp/public/styles/main.css']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
