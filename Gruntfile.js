module.exports = function(grunt) {

  grunt.initConfig({
    clean: {
      dev: ['public/css/**', 'public/build.*']
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

    vulcanize: {
      assets: {
        options: {
          csp: true,
          excludes: {
            imports: ['polymer.html']
          }
        },
        files: {
          'public/build.html': 'public/components/journal-app.html'
        }
      }
    },

    htmlmin: {
      prod: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'public/build.html': 'public/build.html'
        }
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
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('dev', [
    'clean',
    'less',
    'vulcanize'
  ]);

  grunt.registerTask('prod', [
    'clean',
    'less',
    'cssmin',
    'vulcanize',
    'htmlmin',
    'uglify'
  ]);

  grunt.registerTask('default', ['dev']);
};
