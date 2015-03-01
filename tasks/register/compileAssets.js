module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean',
    'less',
    'cssmin',
    'uglify',
    'vulcanize',
    'copy'
  ]);
};
