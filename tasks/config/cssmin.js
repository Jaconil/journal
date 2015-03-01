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
      files: [{
        expand: true,
        cwd: 'public/css',
        src: ['*.css', '!*.min.css'],
        dest: 'public/css',
        ext: '.min.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
};
