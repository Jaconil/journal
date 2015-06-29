module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dev: ['public/css/**', 'public/build.*']
    },

    browserify: {
      dev: {
        files: {
          'public/app.min.js': ['client/app.jsx']
        },
        options: {
          transform: [
            'babelify', 'reactify'
          ]
        }
      }
    },

    less: {
      dev: {
        files: [{
          expand: true,
          cwd: 'public/less/',
          src: ['*.less'],
          dest: 'public/css/',
          ext: '.min.css'
        }]
      }
    },

    cssmin: {
      prod: {
        files: [{
          expand: true,
          cwd: 'public/css',
          src: ['*.min.css'],
          dest: 'public/css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      build: {
        files: {
          'public/build.js': 'public/build.js'
        }
      }
    },

    watch: {
      assets: {
        files: ['public/*'],
        tasks: ['default']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', [
    'clean',
    'less'
  ]);

  grunt.registerTask('prod', [
    'clean',
    'less',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['dev']);
};
