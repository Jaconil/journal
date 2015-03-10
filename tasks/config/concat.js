module.exports = function(grunt) {

  grunt.config.set('concat', {
    templates: {
      src: ['.tmp/public/templates/!(components).html'],
      dest: '.tmp/public/templates/components.min.html'
    },
    js: {
      src: ['src/js/*.js'],
      dest: '.tmp/public/js/main.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
