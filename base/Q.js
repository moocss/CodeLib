/*
 * Q.js
 * 2012-08-16
*/
(function(win,undefined){
	var Q = win.Q || {};
	
	/*dom*/
	Q.dom = Q.dom || {};
	
	Q.g = Q.dom.g = function(id){
		return typeof id =="string" ? document.getElementById(id) : id;
	}
	
	Q.css = Q.dom.css = function(element,attr){
		if(element.style[attr]){
			return element.style[attr];
		}else if(element.currentStyle){
			return element.currentStyle[attr];
		}else if(document.defaultView && document.defaultView.getComputedStyle){
			attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
			return document.defaultView.getComputedStyle(element,null).getPropertyValue(attr);
		}else{
			return null;
		}
	}
	
	Q.target = Q.dom.target = function(event){
		var _e = event || window.event;
		return _e.target || _e.srcElement;
	}
	
	/*function*/
	Q.fn = Q.fn || {};
	
	Q.extend = Q.fn.extend = function(destination,source){
		for( var prop in source ){
			destination[prop] = source[prop];
		}
		return destination;
	}
	
	Q.clearbank = Q.fn.clearbank = function(obj){
		for( var i = 0,len = obj.children.length;i<len;i++){
			if( obj.children[i].nodeType != 1){
				obj.removeChild(obj.children[i]);
			}
		}
		return obj;
	}
	
	/*event*/
	Q.event = Q.event || {};
	Q.add = Q.event.add = function(obj,type,fn){
		if( obj.addEventListener ){
			obj.addEventListener(type,fn,false);
		}else if( obj.attachEvent ){
			obj.attachEvent("on"+type,function(){
				fn.call(obj);
			});
		}else{
			obj["on"+type]=fn;
		}
	}
	
	win.Q = Q;
})(window);
