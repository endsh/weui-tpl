/*
 * {%= js_safe_title %} - v{%= js_safe_version %} - Gruntfile.js
 * home: http://www.haoku.net/
 * Copyright (c) 2015 XiaoKu Inc. All Rights Reserved.
 */

'use strict';

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('{%= js_safe_name %}.json'),

		banner: '/*\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? " * home: " + pkg.homepage + "\\n" : "" %>' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>' +
			' All Rights Reserved.\n */\n',

		clean: {
			files: [
				'dist/js/*.js',
				'dist/css/*.css',
			],
		},

        replacer: {
            iconfont: {
                options : {
                    replace: {
                        "url\\('iconfont." : "url('../fonts/iconfont."
                    }
                },
                files : [
                    {
                        src: ['libs/iconfont/iconfont.css'],
                        dest: 'dist/css/iconfont.css'
                    }
                ]
            }
        },

		concat: {
			options: {
				banner: '<%= banner %>',
			},
			dist: {
				src: [
					'src/js/cool.js',
					'src/js/check.js',
					'src/js/users.js',
					'src/js/{%= js_safe_name %}.js',
				],
				dest: 'dist/js/<%= pkg.name %>.js',
			},
		},

		uglify: {
            options: {
                banner: '<%= banner %>',
            },
            ie8: {
                src: [
                    'bower_components/html5shiv/dist/html5shiv.min.js',
                    'bower_components/respond/dest/respond.min.js',
                    'bower_components/respond/dest/respond.matchmedia.addListener.min.js',
                ],
                dest: 'dist/js/ie8.min.js',
            },
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/jquery-form/jquery.form.js',
                    'bower_components/jquery-tmpl/jquery.tmpl.js',
                    'bower_components/bxslider-4/dist/jquery.bxslider.min.js',
                    'node_modules/jquery-weui/dist/js/jquery-weui.min.js',
                    'node_modules/jquery-weui/dist/js/city-picker.min.js',
                    'node_modules/jquery-weui/dist/js/swiper.min.js',
                    'bower_components/jquery_lazyload/jquery.lazyload.js',
                    'bower_components/fastclick/lib/fastclick.js',
                    'dist/js/web.js',
                ],
                dest: 'dist/js/<%= pkg.name %>.min.js',
            },
        },

		jshint: {
			gruntfile: {
				options: {
					jshintrc: 'grunt/.jshintrc',
				},
				src: 'Gruntfile.js',
			},
			js: {
				options: {
					jshintrc: 'src/js/.jshintrc',
				},
				src: 'src/js/*.js',
			},
		},

		less: {
			options: {
				banner: '<%= banner %>',
			},
			dist: {
				files: {
					'dist/css/<%= pkg.name %>.css': 'src/less/{%= js_safe_name %}.less',
				},
			},
		},

		cssmin: {
            optioins: {
                banner: '<%= banner %>',
            },
            dist: {
                files: {
                    'dist/css/<%= pkg.name %>.min.css': [
                        'bower_components/weui/dist/style/weui.css',
                        'node_modules/jquery-weui/dist/css/jquery-weui.css',
                        'bower_components/bxslider-4/dist/jquery.bxslider.min.css',
                        'dist/css/iconfont.css',
                        'dist/css/web.css',
                    ],
                },
            },
        },

        sprite: {
            options: {
                imagepath: 'dist/img/src/',
                spritedest: 'dist/img/',
                spritepath: '../img/',
                padding: 2,
                spritestamp: true,
                algorithm: 'binary-tree',
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: 'web.min.css',
                    dest: 'dist/css/',
                    ext: '.min.css',
                }]
            }
        },

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile'],
			},
			js: {
				files: '<%= jshint.js.src %>',
				tasks: ['concat', 'jshint:js'],
			},
			css: {
				files: 'src/less/*.less',
				tasks: ['less'],
			},
		},

		copy: {
			fonts: {
				expand: true,
				cwd: 'libs/bootstrap',
				src: 'fonts/*',
				dest: 'dist/',
			},
            img: {
                expand: true,
                src: 'img/**',
                dest: 'dist/',
            },
		},
	});

	grunt.loadNpmTasks('grunt-css-sprite');
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    grunt.registerTask('dist-css', ['replacer', 'less', 'cssmin', 'sprite']);
    grunt.registerTask('dist-js', ['concat', 'uglify']);
    grunt.registerTask('dist-copy', ['copy']);
    grunt.registerTask('build', ['clean', 'dist-copy', 'dist-css', 'dist-js']);
    grunt.registerTask('default', ['build']);
};