/*! =========================================================================
 * ngBarebone Grunt Tasks 0.2.0
 * Copyright 2014 (c) Pongstr Ordillo. MIT License.
 * ========================================================================= */

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Project Configuration
  grunt.initConfig({
    site: {
      app:    'app',
      src:    'src',
      dist:   'dist',
      test:   'test',
      bower:  'bower_components',
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= pkg.description %> '+
            ' * <%= pkg.license %> \n' +
            ' */',

    copy: {
      app: {
        files: [
          {
            expand: true,
            cwd: '<%= site.app %>',
            src: [
              'app/**/*.*',
              'assets/css/**/*.*',
              'assets/img/**/*.*',
              'module/**/*.*',
              'error.html',
              'index.html'
            ],
            dest: '<%= site.dist %>'
          }
        ]
      }
    },

    jshint: {
      init: {
        src: [
          'Gruntfile.js',
          'karma.conf.js'
        ]
      },
      app: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          '<%= site.app %>/app/**/*.js',
          '<%= site.app %>/module/**/**/*.js'
        ]
      }
    },

    karma: {
      app: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    concat: {
      app: {
        options: {
          sourceMap: true,
          sourceMapName: '<%= site.dist %>/app/<%= pkg.name %>.min.js.map',
          separator: ';'
        },
        src: ['<%= site.app %>/app/**/*.js'],
        dest: '<%= site.dist %>/app/<%= pkg.name %>.js'
      },
      module: {
        options: {
          sourceMap: true,
          sourceMapName: '<%= site.dist %>/module/modules.min.js.map',
          separator: ';'
        },
        src: ['<%= site.app %>/module/**/**/*.js'],
        dest: '<%= site.dist %>/module/modules.js'
      }
    },

    uglify: {
      options: {
        mangle: false,
        preserveComments: false
      },
      app: {
        files: {
          '<%= site.dist %>/app/<%= pkg.name %>.min.js': [
            '<%= site.dist %>/app/<%= pkg.name %>.js'
          ],
          '<%= site.dist %>/module/modules.min.js': [
            '<%= site.dist %>/module/modules.js'
          ]
        }
      }
    },

    less: {
      app: {
        options: {
          strictMath: true,
          sourceMap: false
        },
        files: {
          '<%= site.app %>/assets/css/ocean-dark.css': [
            '<%= site.src %>/less/ocean-dark/ocean-dark.less'
          ]
        }
      },
      dist: {
        options: {
          strictMath: true,
          sourceMap: true,
          compress: true
        },
        files: {
          '<%= site.app %>/assets/css/ocean-dark.min.css': [
            '<%= site.src %>/less/ocean-dark/ocean-dark.less'
          ]
        }
      }
    },

    processhtml: {
      app: {
        options: {
          process: true,
          data: {
            appcss: '/assets/css/<%= pkg.name %>.min.css',
            appjs: '/app/<%= pkg.name %>.min.js',
            modulejs: '/module/modules.min.js'
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= site.app %>',
            src: ['*.html'],
            dest: '<%= site.dist %>',
            ext: '.html'
          }
        ]
      }
    },

    htmlmin: {
      app: {
        options: {
          // lint: true,                // breaks entire production build process if enabled, must set exemptions for angular markup
          useShortDoctype: true,
          removeComments:   true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          processScripts: ['text/ng-template'],
          minifyJS: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= site.dist %>',
            src: '*.html',
            dest: '<%= site.dist %>'
          },
          {
            expand: true,
            cwd: '<%= site.app %>',
            src: 'modules/**/**/*.html',
            dest: '<%= site.dist %>'
          }
        ]
      }
    },

    open: {
      firefox: {
        path: 'http://localhost:9001',
        app: 'Firefox',
        delay: 1000
      },
      safari: {
        path: 'http://localhost:9001',
        app: 'Safari',
        delay: 1000
      },
      ie: {
        path: 'http://localhost:9001',
        app: 'Internet Explorer',
        delay: 1000
      }
    },

    watch: {
      jshint: {
        files: [
          '<%= site.app %>/app/**/*.js',
          '<%= site.app %>/module/**/**/*.js'
        ],
        tasks: ['jshint:app']
      },
      less: {
        files: [
          '<%= site.src %>/less/*.less',
          '<%= site.src %>/less/**/*.less'
        ],
        tasks: ['less:app']
      }
    },

  });

  grunt.registerTask('default', []);

  grunt.registerTask('build-css', [
    'less'
  ]);

  grunt.registerTask('watchless', [
    'less:app',
    'watch:less'
  ]);

  grunt.registerTask('test', [
    'jshint:app',
    // 'karma:app'
  ]);

  grunt.registerTask('build', [
    'less',
    'jshint:app',
    'copy:app',
    'concat:app',
    'concat:module',
    'uglify:app',
    'processhtml:app',
    'htmlmin:app'
  ]);

  grunt.registerTask('preview', [
    'open:preview',
    'nodemon'
  ]);

};