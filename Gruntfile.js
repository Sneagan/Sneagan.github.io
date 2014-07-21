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
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      scripts: {
        files: 'source/**/*.js',
        tasks: ['jshint', 'concat', 'uglify'],
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'source/sass',
          src: ['*.scss'],
          dest: '../public/styles/',
          ext: '.css'
        }]
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['source/assets/**'], dest: 'public/assets/'},
        ]
      }
    },
    browserify: {
      dist: {
        files: {
          'public/js/honda_developer_studio.js': ['source/js/**/*.js'],
        },
        options: {}
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('test', ['sass', 'jshint']);
  grunt.registerTask('compile', ['jshint', 'browserify', 'sass', 'copy']);

};