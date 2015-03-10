/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/main.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

  grunt.config.set('less', {
    dev: {
      files: [{
        expand: true,
        cwd: 'src/less/',
        src: [
          '*.less'
        ],
        dest: '.tmp/public/css/',
        ext: '.min.css'
      }]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
};
