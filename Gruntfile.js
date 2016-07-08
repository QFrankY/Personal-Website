module.exports = function(grunt) {

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({

		pug: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: {
					'client/index.html': ['views/index.jade'],
					'client/home/template.html': ['views/home/template.jade'],
					'client/chatter/template.html': ['views/chatter/template.jade']
				}
			}
		},

		watch: {
			html: {
				files: 'views/**/*.jade',
				tasks: ['pug'],
				options: {
					interrupt: true
				}
			}
		}
	});

	grunt.registerTask('default', ['watch']);
}