module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/honda_developer_studio.min.js': ['public/js/honda_developer_studio.js']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'source/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      options: {
        livereload: false
      },
      scss: {
        files: ['source/scss/**/*.scss'],
        tasks: ['clean', 'sass', 'copy'],
        options: {
          interrupt: true
        }
      },
      js: {
        files: ['source/js/**/*.js'],
        tasks: ['jshint', 'browserify', 'uglify'],
        options: {
          interrupt: true
        }
      },
      jade: {
        files: ['source/**/*.jade'],
        tasks: ['jade'],
        options: {
          interrupt: true
        }
      },
      copy: {
        files: ['source/assets/**/*'],
        tasks: ['copy'],
        options: {
          interrupt: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'source/scss/',
          src: ['main.scss'],
          dest: 'public/styles/',
          ext: '.css'
        }]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {
            expand: true,
            cwd: './source/assets/',
            src: ['./**'],
            dest: './public/assets/'
          }
        ]
      }
    },
    clean: {
      build: {
        src: ['public/assets/**', 'public/styles/**']
      }
    },
    browserify: {
      dist: {
        files: {
          'public/js/honda_developer_studio.js': ['source/js/**/MainView.js'],
        },
        options: {}
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          },
          pretty: true
        },
        files: {
          'public/index.html': ['source/*.jade']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('compile', ['jshint', 'browserify', 'uglify', 'clean', 'sass', 'copy', 'jade']);

};