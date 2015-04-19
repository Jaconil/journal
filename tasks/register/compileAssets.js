module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean',
    'less',
    'copy',
    'vulcanize'
  ]);
};
