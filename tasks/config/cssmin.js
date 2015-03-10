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
    prod: {
      files: [{
        expand: true,
        cwd: '.tmp/public/css',
        src: ['*.min.css'],
        dest: '.tmp/public/css',
        ext: '.min.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
