module.exports = function(grunt) {

  grunt.config.set('vulcanize', {
    default: {
      options: {
        strip: true,
        abspath: 'src/templates',
      },
      files: {
        'public/templates/components.html': 'src/templates/*'
      }
    }
  });

  grunt.loadNpmTasks('grunt-vulcanize');
};
