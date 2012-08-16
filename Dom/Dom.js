
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
