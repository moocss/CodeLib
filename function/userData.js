/* *
 * IE : 用户数据持久化
 * 2012-02-22
* */

var userData = userData || {};
    userData = {
        _$ : function(id){
            return typeof id == "string" ? document.getElementById(id) : id;
        },
        setData : function(id,array,dataId){
            var _id = this._$(id);
            if( Object.prototype.toString.call(array) == "[object Object]"){
                for( var i=0,len = array.length;i<len;i++){
                    for( var name in array[i] ){
                        _id.setAttribute( name,array[i][name] );
                    }
                }
            }
            _id.save(dataId);
        },
        getData : function(id,dataId,name){
            var _id = this._$(id),
                data = "";
            if( typeof name =="string" ){
                _id.load(dataId);
                data = _id.getAttribute(name);
            }
            return data;
        },
        removeData : function(id,dataId,name){
            var _id = this._$(id);
            _id.removeAttribute(name);
            _id.save(dataId);
        }
    };