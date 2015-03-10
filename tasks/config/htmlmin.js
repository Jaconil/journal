module.exports = function(grunt) {

  grunt.config.set('htmlmin', {
    prod: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        '.tmp/public/templates/components.min.html': '.tmp/public/templates/components.min.html'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
};
