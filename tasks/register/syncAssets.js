module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'less',
    'copy:templates',
    'concat',
    'sync:assets'
  ]);
};
