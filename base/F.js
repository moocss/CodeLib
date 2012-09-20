/*
 * Q.js
 * 2012-08-16
*/
(function(win,undefined){
	var Q = function( selector,context ){
		return new Q.fn.init(selector,context);
	},
	//检测HTML或ID字符串的方式
	quickExpr = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
	toString = Object.prototype.toString;
	
	Q.fn = Q.prototype = {
		init : function(selector,context){
			var match,elem,ret,doc;
			if( !selector ){
				return this;
			}
			if( selector.nodeType ){
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}
			if( selector === "body" && !context ){
				this.context = document;
				this[0] = document.body;
				this.selector = "body";
				this.length = 1;
				return this;
			}
			if( typeof selector == "string" ){
				match = quickExpr.exec( selector );
				if( match && (match[1] || !context) ){
					if( match[1] ){
						doc = ( context ? context.ownerDocument || context : document );
						ret = rsingleTag.exec( selector );
						if( ret ){
							if( Q.isPlainObject( context ) ){
								selector = [ document.createElement( ret[1] ) ];
								Q.fn.attr.call( selector,context,true );
							}else{
								selector = [ doc.createElement( ret[1] ) ];
							}
						}else{
							ret = buildFragment( [ match[1] ],[ doc ]);
							selector = ( ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
						}
						return Q.merge( this,selector );
					}else{
						elem = document.getElementById( match[2] );
						if( elem ){
							if( elem.id !== match[2] ){
								return rootQ.find( selector );
							}
							this.length = 1;
							this[0] = elem;
						}
						this.context = document;
						this.selector = selector;
						return this;
					}
				}else if( !context && /^\w+$/.test( selector ) ){
					this.selector = selector;
					this.context = document;
					selector = document.getElementsByTagName( selector );
					return Q.merge( this,selector );
				}else if( !context || context.Q ){
					return ( context || rootQ ).find(selector);
				}else{
					return Q( context ).find( selector );
				}
			}else if( Q.isFunction( selector ) ){
				return rootQ.ready( selector );
			}
			if( selector.selector != undefined ){
				this.selector = selector.selector;
				this.context = selector.context;
			}
			return Q.makeArray( selector,this );
		},
		selector : "",
		version : "0.1",
		length : 0,
		size : function(){},
		each : function(callback,args){
			return Q.each(this,callback,args);
		}
	};
	Q.extend = Q.fn.extend = function(){};
	Q.extend({
		isPlainObject : function(obj){
			if( !obj || toString.call(obj) != "[object Object]" || obj.nodeType || obj.setIntercal ){
				return false;
			}
			if( obj.constructor && !hasOwnproperty.call(obj,"constructor") && !hasOwnproperty.call(obj.constructor.prototype,"isPrototypeOf") ){
				return false;
			}
			var key;
			for( key in obj ){}
			return key == undefined || hasOwnproperty.call(obj,key);
		},
		isFunction : function(obj){
			return toString.call(obj) == "[object Function]";
		},
		isArray : function(obj){
			return toString.call(obj) == "[object Array]";
		},
		/*检测元素是否在数组中
		 *返回元素的位置序号
		*/
		inArray : function(element,array){
			/*非IE6,7,8*/
			if( array.indexOf ){
				return array.indexOf(element);
			}
			for( var i=0,len = array.length;i<len;i++ ){
				if( element == array[i] ){
					return i;
				}
			}
			return -1;
		},
		each : function(object,callback,args){
			var name,i=0,
				length = object.length,
				isObj = length === undefined || Q.isFunction(object);
			if( args ){
				if( isObj ){
					for( name in object ){
					
					}
				}else{
					for(;i<length;){
						if( callback.apply(object[i++],args) === false ){
							break;
						}
					}
				}
			}else {
				if( isObj ){
					for( name in object ){
						if( callback.call( object[name],name,object[name]) === false ){
							break;
						}
					}
				}else{
					for( var value == object[0];i<length && callback.call(value,i,value) !== false;value =object[++i] ){
						
					}
				}
			}
			return object;
		}
	});
	
	Q.fn.extend({
		attr : function(name,value){
			return access(this,name,value,true,Q.attr);
		},
		removeAttr : function(name,fn){
			return this.each(function(){
				Q.attr( this,name,"");
				if( this.nodeType ===1 ){
					this.removeAttribute(name);
				}
			});
		},
		addClass : function(value){
			
		}
	});
	win.Q = win.$ = Q;
})(window);
