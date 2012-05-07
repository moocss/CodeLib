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
		},
		clearBlank : function(obj){
			for( var i = 0,len = obj.children.length;i<len;i++){
				if( obj.children[i].nodeType != 1){
					obj.removeChild(obj.children[i]);
				}
			}
			return obj;
		},
		getCssProperty : function(element,attr){
			if(element.style[attr]){
				//若样式存在于html中,优先获取
				return element.style[attr];
			}else if(element.currentStyle){
				//IE下获取CSS属性最终样式(同于CSS优先级)
				return element.currentStyle[attr];
			}else if(document.defaultView && document.defaultView.getComputedStyle){
				//W3C标准方法获取CSS属性最终样式(同于CSS优先级)
				//注意,此法属性原格式(text-align)获取的,故要转换一下
				attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
				//获取样式对象并获取属性值
				return document.defaultView.getComputedStyle(element,null).getPropertyValue(attr);
			}else{
				return null;
			}
		}
	}
	
	/*FocusCarousel*/
	function FocusCarousel(ctg){
		this.opt = {
				  slideContainer : "js_tabslide",
						 imgList : "js_imgList",
						 numList : "js_num",//js_num
					   slideTarget : "li",
					   eventType : "click",
					currentClass : "current",
							 num : 0,
						   speed : 100, //速度
						   step  : 10, //步长
					      effect : {
									 efficacy : "slide", //transparent:透明  slide:滑动
									direction : 1 // 1:左右  0：上下
								},
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
		this.WIDTH = this.HEIGHT = 0; //宽度，高度
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
		opacityShow : function(obj){
			var that = this,
				_opacity = 0;
			function showImg(){
				_opacity += that.setting.step;
				that.setOpacity(obj,_opacity);
				if(_opacity >= 100){
					that.clearTimer( that._timer );
					_opacity = 0;
				}
			}
			that.clearTimer( that._timer );
			that._timer = setInterval(showImg,that.setting.speed);
		},
		setSlide : function(obj,n,arg){
			var that = this;
			if( that.setting.effect.direction == 1){
				obj.style.marginLeft = ( -arg * n )+"px";
			}else{
				obj.style.marginTop = ( -arg * n )+"px";
			}
		},
		slideShow : function(obj,n){
			var that = this,
				_width = _height = 0;
			function animate(){
				if( that.setting.effect.direction == 1 ){
					_width += that.setting.step;
					that.setSlide(obj,n,_width)
					if( _width >= that.WIDTH ){
						that.clearTimer( that._timer );
						_width = 0;
					}
				}else if( that.setting.effect.direction == 0 ){
					_height += that.setting.step;
					that.setSlide(obj,n,_height)
					if( _height >= that.HEIGHT ){
						that.clearTimer( that._timer );
						_height = 0;
					}
				}
			}
			that.clearTimer( that._timer );
			that._timer = setInterval(animate,that.setting.speed);
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
				_imgList = that.imgList(),
				_imgContainer = YJ.Q( that.setting.imgList );
				
			that.checkType( YJ.Q( that.setting.numList ),function(){
				var _numList = that.numList();
				for( var i = 0;i< that.LENGTH; i++ ){
					_numList[i].className = (i == n ) ? that.setting.currentClass : "";
				}
			});
			//透明
			if( that.setting.effect.efficacy == "transparent"){
				for( var j = 0;j<that.LENGTH;j++){
					var _obj = _imgList[j];
					if( j == n ){
						that.opacityShow(_obj);
						_obj.style.zIndex = 11;
					}else{
						that.setOpacity(_obj,0);
						_obj.style.zIndex = 10;
					}
				}
			}
			//左右、上下
			if( that.setting.effect.efficacy == "slide"){
				that.slideShow(_imgContainer,n);
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
				_imgList = that.imgList(),
				_imgContainer = YJ.Q( that.setting.imgList );
			that.LENGTH = _imgContainer.children.length;
			
			that.checkType( YJ.Q(that.setting.numList),function(){
				var _numList = that.numList();
				_numList[i].className = that.setting.currentClass;
			})
			if(that.setting.effect.efficacy == "transparent"){
				that.setOpacity(_imgList[i],100);
			}else if(that.setting.effect.efficacy == "slide"){
				var _arg = that.setting.effect.direction ? that.WIDTH : that.HEIGHT;
				that.setSlide(_imgContainer,i,_arg);
			}
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
				_slideContainer = YJ.Q(that.setting.slideContainer),
				_imgContainer = YJ.Q( that.setting.imgList );
				
			YJ.clearBlank( _imgContainer );
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
			
			if( that.setting.effect.efficacy == "slide"){
				var _firstChild = _imgContainer.children[0];
				if( that.setting.effect.direction == 1){
					that.WIDTH = parseInt( YJ.getCssProperty(_firstChild,'width'));
					_imgContainer.style.width = that.WIDTH * that.LENGTH +"px";
				}else{
					that.HEIGHT = parseInt( YJ.getCssProperty(_firstChild,'height'));
					_imgContainer.style.height = that.HEIGHT * that.LENGTH +"px";
				}
			}
			that.showSlide(that.setting.num);
		}
	}
	win.FocusCarousel = FocusCarousel;
})(window);