module.exports = function(grunt) {

  grunt.config.set('concat', {
    js: {
      src: ['src/js/*.js'],
      dest: '.tmp/public/js/main.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
