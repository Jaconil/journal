module.exports = function (grunt) {
  grunt.registerTask('syncAssets', [
    'less',
    'uglify',
    'vulcanize',
    'sync'
  ]);
};
