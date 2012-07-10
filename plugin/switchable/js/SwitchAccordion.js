/**
  * to:TabSlide
  * author:f2er
  * time:12-03-27
**/
(function(win,undefined){
	function SwitchAccordion(ctg){
		this.option = {
			_id           : ctg.id, //容器ID
			_eventType    : ctg.eventType, //事件触发类型
			_currentClass : ctg.currentClass, //选中类名
			_nornalClass  : ctg.nornalClass, //默认类名
			_effection    : ctg.effection //slide : 展开,transparent : 透明度,start:起始值,end:终止值,step:步骤
		}
		if( !( this instanceof arguments.callee )){
			return new arguments.callee(ctg);
		}
		this._timer = null;
		this.Initialization();
	}
	SwitchAccordion.prototype = {
		constructor : SwitchAccordion,
		addEvent : function( target,type,fn ){
			if( target.addEventListener ){
				target.addEventListener( type,fn,false );
			}else if( target.attachEvent ){
				target.attachEvent( "on"+type,fn );
			}else{
				target["on"+type] = fn;
			}
		},
		_$ : function(id){
			return typeof id == "string" ? document.getElementById(id) : id;
		}, 
		_tag : function(obj,tag){
			return tag != "" ? obj.getElementsByTagName( tag ) : obj.getElementsByTagName("*");
		},
		_var : function(){
			var that      = this,
				_dtArray  = that._tag( that._$( that.option._id),"dt" ),
				_divArray = that._tag( that._$( that.option._id),"div") ,
				_ddArray  = that._tag( that._$( that.option._id),"dd" );
			return {
				_dtArray  : _dtArray,
				_divArray : _divArray,
				_ddArray  : _ddArray
			}
		},
		index : function(obj){
			var that = this,
				_dtArray = that._var()._dtArray;
			for( var i=0,_len = _dtArray.length;i<_len;i++){
				if( obj == _dtArray[i] ){
					return i;
				}
			}
		},
		getCss : function(element,property){
			if( element.currentStyle ){
				return element.currentStyle[property];
			}else{
				var computedStyle = document.defaultView.getComputedStyle(element,null)[property]
				return computedStyle;
			}
		},
		clearTimer : function(){
			var that = this;
			if( that._timer ){
				clearInterval( that._timer );
			}
			that._timer = null;
		},
		setOpacity : function(obj,num){
			obj.style.opacity = num/100;
			obj.style.filter = "alpha(opacity="+num+")";
		},
		setSlide : function(obj,num){
			obj.style.width = num +"px";
		},
		animateShow : function(obj){
			var that = this,
				step = that.option._effection.start;
			function show(){
				step += that.option._effection.step;
				switch( that.option._effection.effect ){
					case "transparent" :
						that.setOpacity(obj,step);
						break;
					case "slide" :
						that.setSlide(obj,step);
						break;
				}
				if( step >= that.option._effection.end ){
					that.clearTimer();
					step = that.option._effection.start ;
				}
			}
			that.clearTimer();
			that._timer = setInterval(show,50);
		},
		trigger : function(n){
			var that      = this,
				_ddArray  = that._var()._ddArray,
				_divArray = that._var()._divArray[n];
			_divArray.className = that.option._nornalClass+" "+that.option._currentClass;
			switch( that.option._effection.effect ){
					case "transparent" :
						that.setOpacity(_ddArray[0],100);
						break;
					case "slide" :
						that.setSlide(_ddArray[0],that.getCss(_ddArray[0],"width"));
						break;
				}
			
			return that;
		},
		effect : function(j){
			var that      = this,
				_dd = that._tag( that._var()._divArray[j],'dd')[0];
			switch( that.option._effection.effect ){
				case "transparent" :
					that.setOpacity(_dd,that.option._effection.start);
					break;
				case "slide" :
					that.setSlide(_dd,that.option._effection.start);
					break;
			}
		},
		Initialization : function(){
			var that      = this,
				_obj      = that._$(that.option._id),
				_objArray = that._var()._divArray;
			that.addEvent( _obj, that.option._eventType,function(event){
				var _ev = event || window.event,
					_target = _ev.target || _ev.srcElement;
				if( _target.nodeName.toLowerCase() != "dt"){ return; }
				var _index = that.index( _target );
				for( var j = _objArray.length-1;j>=0;j-- ){
					that.effect(j);
					_objArray[j].className = ( j != _index ) ? that.option._nornalClass : that.option._nornalClass+" "+that.option._currentClass;
					var _targetImg = that._tag(_objArray[_index],'dd')[0];
					that.animateShow(_targetImg);
				}
			});
			return that;
		}
	}
	win.SwitchAccordion = SwitchAccordion;
})(window);
