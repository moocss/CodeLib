/**
  * to:carousel
  * author:f2er
  * time:12-03-27
  * update : 12-05-02
**/

/*carousel*/
(function(win,undefined){
	
    /*public method YJ*/
	var YJ = win.YJ || {};
	YJ = {
		extend : function(destination,source){
			for( var prop in source ){
				destination[prop] = source[prop];
			}
			return destination;
		},
		Q : function(id){
			return typeof id =="string" ? document.getElementById(id) : id;
		},
		on : function(obj,type,fn){
			if( obj.addEventListener ){
				obj.addEventListener(type,fn,false);
			}else if( obj.attachEvent ){
				obj.attachEvent("on"+type,function(){
					fn.call(obj);
				});
			}else{
				obj["on"+type]=fn;
			}
		},
		getTarget : function(event){
			var _e = event || window.event;
			return _e.target || _e.srcElement;
		}
	}
	
	/*FocusCarousel*/
	function FocusCarousel(ctg){
		this.opt = {
				  slideContainer : "js_tabslide",
						 imgList : "js_imgList",
						 numList : "",//js_num
					   slideTarget : "li",
					   eventType : "click",
					currentClass : "current",
							 num : 0,
							 /*Btn : null,*/
							 Btn : {
									left : "js_leftBtn",
									right : "js_rightBtn",
									leftClass : "leftBtn",
									rightClass : "rightBtn",
									btnDisable : "_disable"
								},
						autoPlay : {
									play : false,
									intervalTime : 2000
						}
							
				};
		
		this.setting = YJ.extend(this.opt,ctg || {});
		this._timer = null;
		this._autoTimer = null;
		this.LENGTH = 0; //统计子个数
		if( !(this instanceof FocusCarousel)){
			return new FocusCarousel(ctg);
		}
		this.init();
	}
	
	FocusCarousel.prototype = {
		constructor : FocusCarousel,
		numList : function(){
			var that = this;
			var _numList = YJ.Q( that.setting.numList ) && YJ.Q( that.setting.numList ).getElementsByTagName( that.setting.slideTarget );
			return _numList;
		},
		imgList : function(){
			var that = this;
			var	_imgList = YJ.Q( that.setting.imgList ).getElementsByTagName(that.setting.slideTarget);
			return _imgList;
		},
		checkType : function(obj,callback){
			if( Object.prototype.toString.call(obj) != "[object Null]" ){
				callback && callback();
			}
		},
		index : function(obj){
			var that = this;
			var _numList = that.numList();
			for( var i = 0;i<that.LENGTH;i++){
				if( obj == _numList[i] ){
					return i;
				}
			}
		},
		clearTimer : function( timer ){
			var that = this;
			if( timer ){
				clearInterval( timer );
				timer = null;
			}
		},
		setOpacity : function(obj,opacityValue){
			obj.style.opacity = opacityValue/100;
			obj.style.filter = "alpha(opacity="+opacityValue+")";
		},
		animateShow : function(obj){
			var that = this,
				_opacity = 0;
			function showImg(){
				_opacity += 10;
				that.setOpacity(obj,_opacity);
				if(_opacity >= 100){
					that.clearTimer( that._timer );
					_opacity = 0;
				}
			}
			that.clearTimer( that._timer );
			that._timer = setInterval(showImg,100);
		},
		BtnState : function(){
			var that = this,
				_imgList = that.imgList();
			that.checkType(that.setting.numList,function(){
				var _numList = that.numList();
			});
			
			that.checkType(that.setting.Btn,function(){
				var _leftBtn = YJ.Q( that.setting.Btn.left ),
					_rightBtn = YJ.Q( that.setting.Btn.right ),
					_leftBtnClass = that.setting.Btn.leftClass,
					_rightBtnClass = that.setting.Btn.rightClass;

				if( that.setting.num >= that.LENGTH -1 ){
					_leftBtn.className = _leftBtnClass;
					_rightBtn.className = _rightBtnClass + that.setting.Btn.btnDisable;
				}else if( that.setting.num < that.LENGTH -1 && that.setting.num >0 ){
					_rightBtn.className = _rightBtnClass;
					_leftBtn.className = _leftBtnClass;
				}else if( that.setting.num <= 0 ){
					_rightBtn.className = _rightBtnClass;
					_leftBtn.className = _leftBtnClass + that.setting.Btn.btnDisable;
				}
			})
		},
		showSlide : function(n){
			var that = this,
				_imgList = that.imgList();
				
			that.checkType( YJ.Q( that.setting.numList ),function(){
				var _numList = that.numList();
				for( var i = 0;i< that.LENGTH; i++ ){
					_numList[i].className = (i == n ) ? that.setting.currentClass : "";
				}
			});
			
			for( var j = 0;j<that.LENGTH;j++){
				var _obj = _imgList[j];
				if( j == n ){
					that.animateShow(_obj);
					_obj.style.zIndex = 11;
				}else{
					that.setOpacity(_obj,0);
					_obj.style.zIndex = 10;
				}
			}
			that.BtnState();
		},
		autoSlide : function(){
			var that = this;
			that.clearTimer( that._autoTimer );
			that._autoTimer = setInterval(function(){
				if( that.setting.num >= that.LENGTH - 1 ){
					that.setting.num = 0;
				}else{
					that.setting.num++;
				}
				that.showSlide(that.setting.num);
			},that.setting.autoPlay.intervalTime);
		},
		Initialization : function(i){
			var that = this,
				_imgList = that.imgList();
			that.LENGTH = YJ.Q(that.setting.imgList).children.length;
			
			that.checkType( YJ.Q(that.setting.numList),function(){
				var _numList = that.numList();
				_numList[i].className = that.setting.currentClass;
			})
			
			that.setOpacity(_imgList[i],100);
			that.BtnState();
		},
		rightEvent : function(lobj,robj){
			var that = this;
				that.setting.num++;
				if( that.setting.num > that.LENGTH - 1 ){
					that.setting.num = that.LENGTH - 1;
					return;
				}
				lobj.className = that.setting.Btn.leftClass;
				that.showSlide( that.setting.num );
		},
		leftEvent : function(lobj,robj){
			var that = this;
			that.setting.num--;
			if( that.setting.num < 0 ){
				that.setting.num = 0;
				return;
			}
			robj.className = that.setting.Btn.rightClass;
			that.showSlide( that.setting.num );
		},
		init : function(){
			var that = this,
				_slideContainer = YJ.Q(that.setting.slideContainer);
			that.Initialization( that.setting.num );
			
			that.checkType(that.setting.Btn,function(){
				var _leftBtn = YJ.Q( that.setting.Btn.left ),
					_rightBtn = YJ.Q( that.setting.Btn.right );
					YJ.on( _leftBtn, that.setting.eventType,function(){
						that.leftEvent(_leftBtn,_rightBtn);
					});
					YJ.on( _rightBtn, that.setting.eventType,function(){
						that.rightEvent(_leftBtn,_rightBtn);
					});
			});
			
			if( that.setting.autoPlay.play ){
				that.autoSlide();
				YJ.on( _slideContainer ,"mouseover",function(e){
					that.clearTimer( that._autoTimer );
				});

				YJ.on( _slideContainer ,"mouseout",function(e){
					that.autoSlide();
				});
			}
			
			/*序号*/
			that.checkType( YJ.Q(that.setting.numList),function(){
				YJ.on( YJ.Q(that.setting.numList ),that.setting.eventType,function(e){
					var _target = YJ.getTarget(e);
					if( _target.nodeName.toLowerCase() != that.setting.slideTarget ){
						return;
					}
					var _index = that.index(_target);
					that.setting.num = _index;
					that.showSlide(that.setting.num);
				});
			});
			that.showSlide(that.setting.num);
		}
	}
	win.FocusCarousel = FocusCarousel;
})(window);