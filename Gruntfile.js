
module.exports = function(grunt){

	var banner = grunt.template.process(
		grunt.file.read("src/banner.js"),
		{data: grunt.file.readJSON("package.json")}
	);

	grunt.initConfig({

		concat: {
			build: {
				options: {banner: banner},
				files: {
					"dist/flashsprite.js": ["src/flashsprite.js"]
				}
			}
		},

		uglify: {
			build: {
				options: {banner: banner},
				files: {
					"dist/flashsprite.min.js": ["src/flashsprite.js"]
				}
			}
		},

		connect: {
			dev: {
				options: {
					base: ".",
					port: 8080,
					keepalive: true
				}
			}
		}
		
	});

	grunt.registerTask("default", []);
	grunt.registerTask("build", ["concat:build", "uglify:build"]);
	grunt.registerTask("dev", ["connect:dev"]);

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-connect");

};