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
		size : function(){}
	};
	Q.extend = Q.fn.extend = function(){};
	
	Q.extend({
		isFunction : function(obj){
			return toString.call(obj) == "[object Function]";
		},
		isArray : function(obj){
			return toString.call(obj) == "[object Array]";
		},
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
		}
	});
	win.Q = win.$ = Q;
})(window);
