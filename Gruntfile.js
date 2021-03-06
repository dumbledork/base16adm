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
      build:  '_gh_pages',
      bower:  'bower_components',
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= pkg.description %> '+
            ' * <%= pkg.license %> \n' +
            ' */',

    watch: {
      jshint: {
        files: ['<%= site.app %>/assets/js/**/*.js'],
        tasks: ['jshint:app']
      },
      less: {
        files: [
          '<%= site.src %>/less/*.less',
          '<%= site.src %>/less/**/*.less'
        ],
        tasks: [
          'less:ocean-dark',
          'less:ocean-dark-dist'
        ]
      }
    },

    jekyll: {
      options: {
        // bundleExec: true,
        src: '<%= site.app %>'
      },
      dist: {
        options: {
          dest: '<%= site.dist %>',
          config: '_config.yml'
        }
      }
    },

    clean: [
      '<%= site.dist %>/assets/lib',
      '<%= site.dist %>/assets/css'
    ],

    less: {
      'ocean-dark': {
        options: {
          strictMath: true,
          sourceMap: false
        },
        files: {
          '<%= site.app %>/assets/css/ocean-dark.css': [
            '<%= site.src %>/less/ocean-dark/ocean-dark.less'
          ],
          '<%= site.dist %>/assets/css/ocean-dark.css': [
            '<%= site.src %>/less/ocean-dark/ocean-dark.less'
          ]
        }
      },
      'ocean-dark-dist': {
        options: {
          strictMath: true,
          sourceMap: true,
          compress: true
        },
        files: {
          '<%= site.app %>/assets/css/ocean-dark.min.css': [
            '<%= site.src %>/less/ocean-dark/ocean-dark.less'
          ],
          '<%= site.dist %>/assets/css/ocean-dark.min.css': [
            '<%= site.src %>/less/ocean-dark/ocean-dark.less'
          ]
        }
      },
      'ocean-light': {
        options: {
          strictMath: true,
          sourceMap: false
        },
        files: {
          '<%= site.app %>/assets/css/ocean-light.css': [
            '<%= site.src %>/less/ocean-light/ocean-light.less'
          ],
          '<%= site.dist %>/assets/css/ocean-light.css': [
            '<%= site.src %>/less/ocean-light/ocean-light.less'
          ]
        }
      },
      'ocean-light-dist': {
        options: {
          strictMath: true,
          sourceMap: true,
          compress: true
        },
        files: {
          '<%= site.app %>/assets/css/ocean-light.min.css': [
            '<%= site.src %>/less/ocean-light/ocean-light.less'
          ],
          '<%= site.dist %>/assets/css/ocean-light.min.css': [
            '<%= site.src %>/less/ocean-light/ocean-light.less'
          ]
        }
      }
    },

    processhtml: {
      dist: {
        options: {
          data: {
            css: '/assets/css/ocean-dark.min.less',
            js:  '/assets/js/app.js'
          }
        },
        files: [
          {
            expand: true,
            cwd: '<%= site.dist %>',
            src: [
              '*.html',
              '**/*.html'
            ],
            dest: '<%= site.dist %>',
            ext: '.html'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          preserveLineBreaks: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= site.dist %>',
            src: [
              '*.html',
              '**/*.html'
            ],
            dest: '<%= site.dist %>'
          }
        ]
      }
    },

    prettify: {
      options: {
        config: '.prettifyrc'
      },
      dist: {
        expand: true,
        cwd: '<%= site.dist %>',
        ext: '.html',
        src: ['*.html', '**/*.html'],
        dest: '<%= site.dist %>'
      }
    },

    jshint: {
      init: {
        src: ['Gruntfile.js']
      },
      app: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          '<%= site.app %>/assets/js/**/*.js'
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'jekyll:dist',
    'less:ocean-dark',
    'less:ocean-dark-dist',
    'less:ocean-light',
    'less:ocean-light-dist',
    'processhtml:dist',
    'prettify:dist'
  ]);

  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('buildless', [
    'less',
    'watch:less'
  ]);

  grunt.registerTask('watchless', [
    'less:ocean-dark',
    'less:ocean-dark-dist',
    'less:ocean-light',
    'less:ocean-light-dist',
    'watch:less'
  ]);

  grunt.registerTask('theme', function (theme) {
    grunt.config.requires('site.dist');

    if (theme === 'light') {
      grunt.config('site.dist', '_dist_ocean-light');
      grunt.task.run([
        'jekyll:dist',
        'clean',
        'processhtml:dist',
        'prettify:dist',
        'less:ocean-light',
        'less:ocean-light-dist',
      ]);
    }

    if (theme === 'dark') {
      grunt.config('site.dist', '_dist_ocean-dark');
      grunt.task.run([
        'jekyll:dist',
        'clean',
        'processhtml:dist',
        'prettify:dist',
        'less:ocean-dark',
        'less:ocean-dark-dist'
      ]);
    }
  });
};
