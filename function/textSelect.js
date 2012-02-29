/*
  * setTextSelect : 选择部分文本
  * getTextSelect : 设置部分文本
  * 2012-03-01
* */

var textSelection = textSelection || {};
textSelection = {
    setTextSelect : function( obj,startIndex,stopIndex ){
        if( obj.setSelectionRange ){
            obj.setSelectionRange( startIndex,stopIndex );
        }else if( obj.createTextRange ){
            var _range = obj.createTextRange();
            _range.collapse( true );
            _range.moveStart( "character",startIndex );
            _range.moveEnd( "character",stopIndex-startIndex );
            _range.select();
        }
        obj.focus();
    },
    getTextSelect : function( obj ){
        if( document.selection ){
            return document.selection.createRange().text;
        }else{
            return obj.value.substring( obj.selectionStart,obj.selectionEnd );
        }
    }
};