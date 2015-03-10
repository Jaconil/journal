module.exports = function (grunt) {
  grunt.registerTask('compileAssets', [
    'clean',
    'less',
    'copy:templates',
    'concat',
    'copy:assets'
  ]);
};
