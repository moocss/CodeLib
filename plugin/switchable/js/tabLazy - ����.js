/*
 * plugIn:TabLazy
 * depend:js
 * author:QF
 * time: 12-03-22
*/

/*extend*/
Object.extend = function(destination, source){
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
};

/*TabLazy*/
function TabLazy(ctg){
	this._ctg={
			hid:"tab_type",
			htag:"li",
			currentClass:"cur",
			bid:"tab_ooxx",
			bnode:"div",
			bclass:"m_imglist",
			dPro:"loaded",/*自定义属性*/
			mid:"mt_wrt",
			postUrl:"http://www.4399.com",
			num:0
		}
	this.option=Object.extend(this._ctg,ctg);
	if( !(this instanceof arguments.callee) ){
		return new arguments.callee(this.option);
	}	
	this.init();
}
TabLazy.prototype={
	$get:function(id){
		return typeof id=="string"?document.getElementById(id):id;	
	},
	getElementsByclass:function(root,tag,classStr){
		var that=this;
		var _root,_tag;
		if(root){
			_root=(typeof root=="string") ? that.$get(root):root;
		}else{
			_root=document.body;	
		};
		_tag=tag || "*";
		var _eles=_root.getElementsByTagName(_tag),_arr=[];
		for(var i=0,n=_eles.length;i<n;i++){
			var _temp=_eles[i].className.split(" ");
			for(var j=0,_tLen=_temp.length;j<_tLen;j++){
				if(classStr.match(_temp[j])){
					_arr[_arr.length]=_eles[i];
					break;
				};
			};	
		}
		return _arr;
	},
	preventDefault:function(e){
		var ev=e||window.event;
		if( ev && ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue=false;	
		}	
	},
	exec:function(tag,btag){
		var that=this;
		var _m=that.option.num;
		tag[_m].className=that.option.currentClass;
		tag[_m].setAttribute(that.option.dPro,'true');
		var _uid=tag[_m].getAttribute('id');
		btag[_m].style.display="block";
		that.getData(_m);
		//that.doMore(_uid)	
	},
	doMore:function(m){
		var that=this;
		var _url=that.option.postUrl+m;
		that.$get(that.option.mid).innerHTML='<a href="'+_url+'" title="更多&gt;&gt;">更多&gt;&gt;</a>';	
	},
	getData:function(n){
		var that=this;
		var _tabBd=that.$get(that.option.bid).getElementsByTagName(that.option.bnode)[n];
		var _textarea=_tabBd.getElementsByTagName('textarea')[0];
		var _ul=document.createElement('ul');
		_ul.innerHTML=_textarea.value;
		_tabBd.insertBefore(_ul,_tabBd.childNodes[0]);
	},
	getIndex:function(node,obj){
		var that=this;
		for( var j=0,_len=obj.length;j<_len;j++){
			if(obj[j]==node){
				return j;	
			}
		}
	},
	init:function(){
		var that=this;
		var _htag=that.$get(that.option.hid).getElementsByTagName(that.option.htag);
		var _bcon=that.getElementsByclass(that.$get(that.option.bid),that.option.bnode,that.option.bclass);
		that.exec(_htag,_bcon);
		that.$get(that.option.hid).onclick=function(e){
			var ev=e||window.event;
			var _target=ev.srcElement || ev.target;
			
			if( _target.nodeName.toLowerCase()!="a"){
				return;	
			};
			var ele=_target.parentNode;
			var _index=that.getIndex(ele,_htag);
			for( var m=0,len=_htag.length;m<len;m++){
				_htag[m].className=(m==_index)?that.option.currentClass:"";
			}
			for( var n=0,len=_bcon.length;n<len;n++){
				_bcon[n].style.display=(n==_index)?"block":"none";	
			}
			var _uid=ele.getAttribute('id');
			if(ele.getAttribute(that.option.dPro)=="false"){
				that.getData(_index);
				ele.setAttribute(that.option.dPro,'true');
				
			}
			//that.doMore(_uid);
			that.preventDefault(ev);
		}	
	}	
}



