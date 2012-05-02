/*
 @setFocus: 焦点轮播图 (depend:jQuery)
*/

(function($){
	$.setFocus = function(opt){
		//替换缺省值
		opt = $.extend({
			focusWrap:"#focus_wrap", //总容器
			focusBox:"#focus_pics", //图片容器 
			focusPics:"#focus_pics > p", //图片选择器
			focusNum:"#lb_num>li",
			handlePrev:"#prev", //上一条按钮
			handleNext:"#next", //下一条按钮
			disablePrev:"g_first",//左按钮不可用
			disableNext:"g_final", //右按钮不可用
			curClass:"on", //标识当前样式
			eventType:"mouseover", //鼠标事件设置
			eventSpeed:"normal", //动画速度，设0则无动画
			eventTime:2000, //轮播间隔时间，设0则不自动轮播
			scrollDirection:0, //动画滚动方向,0为左右滚动,1为上下滚动
			curNum:0, //标识默认停在第几个
			arrowBool:false, //false:箭头不显示,true:数字出现
			proper:"img_url"
		},opt);
		//变量
		var height = $(opt.focusPics).height(),
			width = $(opt.focusPics).width(),
			size = $(opt.focusPics).size(),
			focusWrap = opt.focusWrap,
			focusBox = opt.focusBox,
			focusPics = opt.focusPics,
			handlePrev = opt.handlePrev,
			handleNext = opt.handleNext,
			curClass = opt.curClass,
			eventType = opt.eventType,
			eventSpeed = opt.eventSpeed,
			eventTime = opt.eventTime,
			scrollDirection = opt.scrollDirection,
			curNum = opt.curNum,
			arrowBool=opt.arrowBool,
			focusNum=opt.focusNum,
			proper=opt.proper;
		
			//初始化
			if(scrollDirection){
				//上下滚动
				$(focusBox).css("top","-"+curNum*height+"px");	
			}else{
				//左右滚动
				$(focusBox).width(size*width);
				$(focusBox).css("left","-"+curNum*width+"px");	
			}
			
			//数字
			if(arrowBool==true){
				$($(focusNum).get(curNum)).addClass(curClass);
			}
			//执行程序
			mainFun();
			//是否自动轮播
			if(eventTime){interval();}
		
		//主程序
		function mainFun(){
			imgLoad(opt.curNum);
			//数字绑定事件
			if(arrowBool==true){
				$(focusNum).each(function(i){
					$(this).bind(eventType,function(){	
						scrollAnimate(i);
						opt.curNum = i;
						return false;
					});
				});	
			}
			//第一条
			if(opt.curNum==0){
				$(handlePrev).addClass(opt.disablePrev);	
			}
			//最后一条
			if(opt.curNum==size-1){
				$(handleNext).addClass(opt.disableNext);	
			}
			
			if(size==1){
				$(handleNext).hide();
				$(handlePrev).hide();	
			}
			
			//上一条绑定事件
			$(handlePrev).bind("click",function(){
					$(handleNext).removeClass(opt.disableNext);
					if(opt.curNum!=0){
						curNumAdd(false,size);
						scrollAnimate(opt.curNum);
					}
					
					if(opt.curNum==0){
						$(this).addClass(opt.disablePrev);	
					}
					return false;			 
			});
			//下一条绑定事件
			$(handleNext).bind("click",function(){
					$(handlePrev).removeClass(opt.disablePrev);
					if(opt.curNum!=size-1){
						curNumAdd(true,size);								
						scrollAnimate(opt.curNum);
					}
					
					if(opt.curNum==size-1){
						$(this).addClass(opt.disableNext);	
					}
					
					return false;					 
			});
		};
		//定时执行
		function interval(){
			//定时函数
			var inter = {
				itv:null,
				setinterval:function(){
					if (this.itv) {
						this.clearinterval();
					}
					this.itv = setInterval(function(){
						curNumAdd(true,size);
						scrollAnimate(opt.curNum);
					},eventTime);	
				},
				clearinterval:function(){
					clearInterval(this.itv);
					this.itv = null;
				}
			};
			//启动定时
			inter.setinterval();
			//鼠标悬停清除定时
			$(focusWrap).hover(function(){
				inter.clearinterval();
			},function(){
				inter.setinterval()	
			});
			$(focusNum).click(function(){
				inter.setinterval()
			})
			
		};
		
		//计数器叠加
		function curNumAdd(isAdd){
			var curNum = opt.curNum;
			if(isAdd){
				//递增
				opt.curNum = (++curNum > size-1)? 0 : curNum;
			}else{
				//递减
				opt.curNum = (--curNum < 0)? size-1 : curNum;	
			}		
		};
		
		
		//图片加载
		function imgLoad(i){
			//callback
			function callback(i,url){
				var _object=$(focusBox).find('img').eq(i);
					_object.parent().removeClass('img_loading');
					_object.attr("src",url);
			}
			var _fimg=$(focusBox).find('img');
			
			var _img=new Image();
			var _url=_fimg.eq(i).attr(proper);
			if(_url && _url != ""){
				if($.browser.msie){
					_img.onreadystatechange=function(){
					if(_img.readyState=="complete" || _img.readyState=="loaded" ){
							callback(i,_url);	
						}	
					}	
				}else{
						_img.onload=function(){
						if(_img.complete==true){
								callback(i,_url);
							}	
						}	
					}
				_img.src=_url;		
			}	
		}
		
	
		//滚动动画程序
		function scrollAnimate(i){
			if( $(focusBox).find("img:eq("+i+")").attr('src') == undefined){
				imgLoad(i);
			}
			
			//滚动动画
			if(scrollDirection){
				//上下滚动
				$(focusBox).stop().animate({
					top:"-"+height*i+"px"		  
				},eventSpeed);	
			}else{
				//左右滚动
				$(focusBox).stop().animate({
					left:"-"+width*i+"px"		  
				},eventSpeed);	
			}
			//当前on状态标示
			$(focusNum).removeClass(curClass);
			$(focusNum).eq(i).addClass(curClass);
		};
	};
})(jQuery);	