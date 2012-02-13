/* *
 * EventUtil
 * 2012-02-13
* */
var EventUtil = EventUtil || {};
EventUtil.addEvent = function(obj,otype,fn){
	if( obj.addEventListener ){
		obj.addEventListener( otype,fn,false );
	}else if( obj.attachEvent ){
		obj.attachEvent('on'+otype,fn);
	}else{
		obj['on'+otype ] = fn;
	}
} 
EventUtil.removeEvent = function(obj,otype,fn){
	if( obj.removeEventListener ){
		obj.removeEventListener(otype,fn,false);
	}else if( obj.detachEvent ){
		obj.detachEvent('on'+type,fn);
	}else{
		obj['on'+otype]=null;
	}
}
