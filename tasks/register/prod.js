module.exports = function (grunt) {
  grunt.registerTask('prod', [
    'compileAssets',
    'cssmin',
    'uglify',
    'htmlmin',
  ]);
};
