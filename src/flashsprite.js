(function($){

	$.extend($, {

		/**
		 * FlashSprite
		 *
		 * @class Load and play sprite animations made by Flash CS6+
		 * @constructor
		 */
		FlashSprite : function(node){

			var my = this;

			this.options = {
				src : null,
				fps : 30,
				autoPlay : true
			};

			this.vars = {
				frames : null,
				meta : null,
				image : null,
				width : null,
				height : null,
				length : null,
				interval : null
			};

			this.node = node;
			this.index = 0;
			this.timer = null;

			/**
			 * Initialize
			 * @param Object options (optional)
			 */
			this.init = function(options){
				if(options){
					this.config(options);
				}
				this._load();
			};

			/**
			 * Configure
			 * @param Object options
			 */
			this.config = function(options){
				$.extend(this.options, options);
				this.vars.interval = Math.floor(1000 / this.options.fps);
			};

			/**
			 * Call methods
			 * @param String method
			 * @param Array args
			 */
			this._call = function(method, args){
				if($.isFunction(this[method])){
					this[method].apply(this, args);
				}
			};

			/**
			 * Load JSON published by Flash
			 */
			this._load = function(){
				$.getJSON(this.options.src)
				.done(function(data){
					var img = new Image();

					$.extend(my.vars, {
						meta : data.meta,
						image : my.options.src.replace(/((\?|#).+|[^\/]+)?$/, "")
							+ data.meta.image,
						frames : data.frames,
						length : data.frames.length,
						width : data.frames[0].frame.w,
						height : data.frames[0].frame.h
					});
					img.onload = $.proxy(my._initNode, my);
					img.src = my.vars.image;
				});
			};

			/**
			 * Initialize the node as animation container
			 */
			this._initNode = function(){
				this.node.width(this.vars.width)
				.height(this.vars.height)
				.css({
					"background-repeat" : "no-repeat",
					"background-image" : "url(" + this.vars.image + ")"
				});
				if(this.options.autoPlay){
					this.play();
				}
				this.node.trigger("flashSpriteReady");
			};

			/**
			 * Play the animation
			 */
			this.play = function(){
				this.stop();
				this._forward();
			};

			/**
			 * Forward the frame
			 */
			this._forward = function(){
				my._goto((my.index + 1) % (my.vars.length - 1));
				my.timer = setTimeout(my._forward, my.vars.interval);
			};

			/**
			 * Reverse the animation
			 */
			this.reverse = function(){
				this.stop();
				this._backward();
			};

			/**
			 * Backward the frame
			 */
			this._backward = function(){
				my.index -= 1;
				if(my.index < 0){
					my.index = my.vars.length - 1;
				}
				my._goto(my.index);
				my.timer = setTimeout(my._backward, my.vars.interval);
			};

			/**
			 * Go to the frame by index
			 * @param Integer index
			 */
			this._goto = function(index){
				if(index < 0 || index >= this.vars.length){
					return;
				}
				my.index = index;
				this.node.css(
					"background-position",
					"-" + this.vars.frames[this.index].frame.x + "px -"
						+ this.vars.frames[this.index].frame.y + "px"
				);
			};

			/**
			 * Stop the animation
			 */
			my.stop = function(){
				clearTimeout(my.timer);
				my.timer = null;
			};

			/**
			 * Go to the frame and stop the animation
			 * @param Integer frame
			 */
			my.gotoAndStop = function(frame){
				this.stop();
				this._goto(frame);
			};

			/**
			 * Go to the frame and play the animation
			 * @param Integer frame
			 */
			my.gotoAndPlay = function(frame){
				this._goto(frame);
				this.play();
			};
		}
	});

	$.fn.extend({
		/**
		 * Initialize FlashSprite or call method
		 * @param String method (optional)
		 * @param Mixed arg (optional)
		 */
		flashSprite : function(/* method, arg1, arg2... */){
			var args, method;

			args = [];
			$.each(arguments, function(i, value){
				args.push(value);
			});
			method = (typeof args[0] === "string") ? args.shift() : "init";
			this.each(function(){
				var node = $(this);
				if(! node.data("flashSprite")){
					node.data("flashSprite", new $.FlashSprite(node));
				}
				node.data("flashSprite")._call(method, args);
			});
		}
	});

}(jQuery));