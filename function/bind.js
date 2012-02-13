/* *
 * 函数绑定与函数柯里化
 * 2012-02-13
* */
function bind( fn,context ){
	var _context = context || window;
	var args = Array.prototype.slice.call(arguments,2);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat( innerArgs );
		return fn.apply( _context,finalArgs );
	}
}
