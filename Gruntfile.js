
module.exports = function(grunt){

	var component, options;

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");

	component = grunt.file.readJSON("component.json");
	options = {
		splitBanners : true,
		banner : grunt.file.read("src/banner.js").replace("{{version}}", component.version)
	};

	grunt.initConfig({
		concat : {
			options : options,
			dist : {
				src : ["src/flashsprite.js"],
				dest : "dist/flashsprite.js"
			}
		},
		uglify : {
			options : options,
			dist : {
				src : ["src/flashsprite.js"],
				dest : "dist/flashsprite.min.js"
			}
		}
	});

	grunt.registerTask("default", ["concat", "uglify"]);

};