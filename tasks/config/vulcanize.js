module.exports = function(grunt) {

  grunt.config.set('vulcanize', {
    default: {
      options: {
        csp: true,
        excludes: {
          imports: [
            "polymer.html"
          ]
        }
      },
      files: {
        '.tmp/public/build.html': '.tmp/public/components/journal-app.html'
      },
    }
  });

  grunt.loadNpmTasks('grunt-vulcanize');
};
