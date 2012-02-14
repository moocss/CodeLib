/* *
 * 函数节流
 * 2012-02-14
* */

//普通写法
var processor = processor || {};
processor = {
	timeoutId : null,
	process : function( fn ){
		clearTimeout( this.timeoutId );
		var that = this;
		that.timeoutId = setTimeout(function(){
			//判断参数类型
			if( Object.prototype.toString.call(fn) == "[object Function]"){ fn(); }
		},100)
	}
}

//文艺写法
function throttle(method,context){
	clearTimeout( method.timeoutId );
	method.timeoutId = setTimeout(function(){
		method.call(context);
	},100)
}