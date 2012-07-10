/*
 * tab+loadContent
 * author:QF
 * time: 12-03-12
*/
function TabLoad( ctg ){
	this.options = {
			_tabHandle : $("#tab_ul li"),
			_curClass : "current",
			_bdHandle : $('#tab_bd'),
			_conHandle : ".m_tcon",
			_flag : "tflag",
			_eventType : "click",
			_num :0,
			_tabCon : "tabslide_",
			_callback : function(){}
		}
	this.option = $.extend( this.options,ctg );
	if( !(this instanceof TabLoad) ){
		return new TabLoad(ctg);  
	}	
	this.init();
}

TabLoad.prototype = {
	init : function(){
		var _option = this.option;
		_option._tabHandle.each(function(i){
			$(this).bind( _option._eventType,function(e){
				var that = $(this),
					_conHandle = _option._bdHandle.find( _option._conHandle );
				that.siblings().removeClass( _option._curClass ).end().addClass( _option._curClass );
				_conHandle.siblings( _option._conHandle ).hide();
					_conHandle.eq(i).show(0,function(){
						var _textareaObj = $("#"+_option._tabCon+i);
						var _flag = that.attr( _option._flag );
						if( _flag == "false"){
							var _textareaValue = _textareaObj.find('textarea').val();
							_textareaObj.first().append( _textareaValue );
							that.attr( _option._flag,"true");
						}
						if( Object.prototype.toString.call( _option._callback ) == "[object Function]"){
							(_option._callback)(i);
						}
					});
				e.preventDefault();
			})
		}).eq( _option._num ).trigger( _option._eventType )
	}
};



