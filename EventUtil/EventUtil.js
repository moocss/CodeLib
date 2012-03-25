/* *
 * EventUtil
 * 2012-02-13
 * update : 2012-03-11
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

/*鼠标按钮*/
/* 0:主鼠标按钮，1:中间滚轴,2:次鼠标按钮*/
EventUtil.getButton = function(event){
    if( document.implementation.hasFeature("MouseEvents","2.0")){
        return event.button;
    }else{
        switch( event.button ){
            case 0:
            case 1:
            case 3:
            case 5:
            case 7:
                return 0;
            case 2:
            case 6:
                return 2;
            case 4:
                return 1;
        }
    }
};

/*获取字符编码*/
EventUtil.getCharCode = function(event){
    if( typeof event.charCode == "number" ){
        return event.charCode;
    }else{
        return event.keyCode;
    }
};

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

/*获取鼠标滚轮增量值*/
EventUtil.getWheelDelta = function(event){
    if( event.wheelDelta ){
        return event.wheelDelta;
    }else if( event.detail ){
        return -( event.detail * 40 );
    }
};

/* *
 * Dom
 * 2012-03-20
* */
var Dom = Dom || {};

Dom.offset = function( element ){
    var _obj = element;
    var getOffsetLeft = (function(){
        var _actualLeft = _obj.offsetLeft,
            _currentParent = _obj.offsetParent;
        while( _currentParent !== null ){
            _actualLeft += _currentParent.offsetLeft;
            _currentParent = _currentParent.offsetParent;
        }
        return _actualLeft;
    })();
    var getOffsetTop = (function(){
        var _actualTop = _obj.offsetTop,
            _currentParent = _obj.offsetParent;
        while( _currentParent !== null ){
            _actualTop += _currentParent.offsetTop;
            _currentParent = _currentParent.offsetParent;
        }
    })();

    var _offset = {
        left : getOffsetLeft,
        top : getOffsetTop
    };
    return _offset;
};

/*
*  contains
* */
Dom.contains = function(refNode,otherNode){
    if( typeof refNode.contains == "function"){
        return refNode.contains(otherNode);
    }else if( typeof refNode.compareDocumentPosition(otherNode)){
        return !!(refNode.compareDocumentPosition(otherNode)&16);
    }else{
        var _node = otherNode.parentNode;
        do{
            if(_node === refNode){
                return true;
            }else{
                _node = _node.parentNode;
            }
        }while(_node!=null)
    }
};

Dom.InnerText = function(){
    function getInnerText(element){
        return ( typeof element.textContent == "string" ) ? element.textContent : element.innerText;
    }
    function setInnerText(element,text){
        if( typeof element.textContent =="string" ){
            element.textContent = text;
        }else{
            element.innerText = text;
        }
    }
    return {
        set : setInnerText,
        get : getInnerText
    }
};
