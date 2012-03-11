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
};

EventUtil.removeEvent = function(obj,otype,fn){
	if( obj.removeEventListener ){
		obj.removeEventListener(otype,fn,false);
	}else if( obj.detachEvent ){
		obj.detachEvent('on'+type,fn);
	}else{
		obj['on'+otype]=null;
	}
};

EventUtil.getEvent = function(event){
    return  event || window.event;
};

EventUtil.getTarget = function(event){
     return event.target || event.srcElement;
};

/*获取相关元素*/
EventUtil.getRelatedTarget = function(event){
    if( event.relatedTarget ){
        return event.relatedTarget;
    }else if( event.toElement ){ //mouseout
        return event.toElement;
    }else if( event.fromElement ){ //mouseover
        return event.fromElement;
    }
};

/*获取字符编码*/
EventUtil.getCharCode = function(event){};

/*阻止默认行为*/
EventUtil.preventDefault = function(event){
    if( event.preventDefault ){
        event.preventDefault();
    }else {
        event.returnValue = false;
    }
};

/*阻止事件冒泡*/
EventUtil.stopPropagation = function(event){
    if( event.stopPropagation ){
        event.stopPropagation();
    }else{
        event.cancelBubble = true;
    }
};

/*粘贴板取得数据*/
EventUtil.getClipboardText = function(event){
    var clipboardText = event.clipboardData || window.clipboardData;
    return clipboardText.getData("text");
};

/*设置数据给粘贴板*/
EventUtil.setClipboardText = function(event,value){
    if( event.clipboardData ){
        return event.clipboardData.setData("text/plain",value);
    }else if( window.clipboardData ){
        return window.clipboardData.setData("text",value);
    }
};
