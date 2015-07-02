module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dev: ['public/app.min.*']
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
        files: {
          'public/app.min.css': ['client/**/*.less']
        }
      }
    },

    cssmin: {
      prod: {
        files: [{
          'public/app.min.css': ['public/app.min.css']
        }]
      }
    },

    uglify: {
      build: {
        files: {
          'public/app.min.js': 'public/app.min.js'
        }
      }
    },

    watch: {
      assets: {
        files: ['client/**/*'],
        tasks: ['default'],
        options: {
          interrupt: true,
          debounce: 500
        }
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
    'browserify',
    'less'
  ]);

  grunt.registerTask('prod', [
    'clean',
    'browserify',
    'less',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['dev']);
};
