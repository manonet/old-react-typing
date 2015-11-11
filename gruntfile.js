module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    // var os = require('os');
    // var path = require('path');

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-svgmin');

    grunt.initConfig({

        settings: {
            // Path
            jsSourceDir: 'templates/manonet-chameleon/scripts/src/',
            jsDir: 'templates/manonet-chameleon/scripts/build/',
            sassDir: 'templates/manonet-chameleon/styles/src/',
            cssDir: 'templates/manonet-chameleon/styles/build/',
            imagesDir: 'templates/manonet-chameleon/imgs/',
            fontsDir: 'templates/manonet-chameleon/fonts/'
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%= settings.sassDir %>',
                    cssDir: '<%= settings.cssDir %>',
                    outputStyle: 'expanded',
                    imagesDir: '<%= settings.imagesDir %>build/',
                    fontsDir: '<%= settings.fontsDir %>'
                }
            },
            prod: {
                options: {
                    sassDir: '<%= settings.sassDir %>',
                    cssDir: '<%= settings.cssDir %>',
                    environment: 'production',
                    outputStyle: 'compressed',
                    specify: ['<%= settings.sassDir %>*.scss'],
                    imagesDir: '<%= settings.imagesDir %>build/',
                    fontsDir: '<%= settings.fontsDir %>'
                }
            },
            clean: {
                options: {
                    cssDir: '<%= settings.cssDir %>',
                    clean: true
                }
            }
        },

        scsslint: {
            options: {
                bundleExec: false,
                config: '<%= settings.sassDir %>.scsslint.yml',
                reporterOutput: null,
                colorizeOutput: true
            },
            src: [
              '<%= settings.sassDir %>*.scss',
              '!<%= settings.sassDir %>/_normalize.scss',
              '!<%= settings.sassDir %>/_mixins.scss',
              '!<%= settings.sassDir %>/styleguide.scss'
            ],
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            all: ['<%= settings.jsSourceDir %>*.js']
        },

        uglify: {
            dev: {
                options: {
                    mangle: false, // Specify mangle: false to prevent changes to your variable and function names.
                    sourceMap: true, // Generate a source map by setting the sourceMap option to true. The generated source map will be in the same directory as the destination file. Its name will be the basename of the destination file with a .map extension. 
                    beautify: true, // Specify beautify: true to beautify your code for debugging/troubleshooting purposes.
                },
                files: {
                    '<%= settings.jsDir %>lib.js': [
						'<%= settings.jsSourceDir %>lib/**/*.js'
					],
                    '<%= settings.jsDir %>script.js': [
                        '<%= settings.jsSourceDir %>bootstrap/util.js',
                        '<%= settings.jsSourceDir %>bootstrap/alert.js',
                        '<%= settings.jsSourceDir %>bootstrap/button.js',
                        '<%= settings.jsSourceDir %>bootstrap/carousel.js',
                        '<%= settings.jsSourceDir %>bootstrap/collapse.js',
                        '<%= settings.jsSourceDir %>bootstrap/dropdown.js',
                        '<%= settings.jsSourceDir %>bootstrap/modal.js',
                        '<%= settings.jsSourceDir %>bootstrap/scrollspy.js',
                        '<%= settings.jsSourceDir %>bootstrap/tab.js',
                        '<%= settings.jsSourceDir %>bootstrap/tooltip.js',
                        '<%= settings.jsSourceDir %>bootstrap/popover.js',
                        '<%= settings.jsSourceDir %>typing/keyboard.js',
                        '<%= settings.jsSourceDir %>typing/lesson.js',
                        '<%= settings.jsSourceDir %>typing/statistic.js',
                        '<%= settings.jsSourceDir %>typing/typing.js',
                        '<%= settings.jsSourceDir %>*.js'
                    ]
                }
            },
            prod: {
                options: {
                    mangle: true,
                    sourceMap: false,
                    beautify: false
                },
                files: {
                    '<%= settings.jsDir %>lib.js': [
						'<%= settings.jsSourceDir %>lib/**/*.js'
					],
                    '<%= settings.jsDir %>script.js': [
                        '<%= settings.jsSourceDir %>bootstrap/util.js',
                        '<%= settings.jsSourceDir %>bootstrap/alert.js',
                        '<%= settings.jsSourceDir %>bootstrap/button.js',
                        '<%= settings.jsSourceDir %>bootstrap/carousel.js',
                        '<%= settings.jsSourceDir %>bootstrap/collapse.js',
                        '<%= settings.jsSourceDir %>bootstrap/dropdown.js',
                        '<%= settings.jsSourceDir %>bootstrap/modal.js',
                        '<%= settings.jsSourceDir %>bootstrap/scrollspy.js',
                        '<%= settings.jsSourceDir %>bootstrap/tab.js',
                        '<%= settings.jsSourceDir %>bootstrap/tooltip.js',
                        '<%= settings.jsSourceDir %>bootstrap/popover.js',
                        '<%= settings.jsSourceDir %>typing/keyboard.js',
                        '<%= settings.jsSourceDir %>typing/lesson.js',
                        '<%= settings.jsSourceDir %>typing/statistic.js',
                        '<%= settings.jsSourceDir %>typing/typing.js',
                        '<%= settings.jsSourceDir %>*.js'
                    ]
                }
            }
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: '<%= settings.imagesDir %>src/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= settings.imagesDir %>build'
                }]
            }
        },

        svgmin: {
            options: {
                plugins: [
                    { removeViewBox: false },
                    { removeUselessStrokeAndFill: false },
                    { removeEmptyAttrs: false },
                    { sortAttrs: true },
                    {
                        cleanupNumericValues: {
                            floatPrecision: 1
                        }
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.imagesDir %>src/',
                    src: '{,*/}*.svg',
                    dest: '<%= settings.imagesDir %>build',
                    ext: '.svg'
                }]
            }
        },

        watch: {
            options: { livereload: true },
            scripts: {
                files: ['<%= settings.jsSourceDir %>**/*.js'],
                tasks: ['jshint', 'uglify']
            },
            sass: {
                files: ['<%= settings.sassDir %>**/*.scss'],
                tasks: ['scsslint', 'compass:dev']
            }
        },


    })

    grunt.registerTask('compile', ['compass:clean', 'imagemin', 'svgmin:dist', 'compass:prod', 'uglify:prod']);
    grunt.registerTask('default', ['compile']);
}
