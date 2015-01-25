module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'less',
    'sync'
  ]);
};
