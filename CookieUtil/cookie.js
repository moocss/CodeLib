/* *
 * cookie
 * 2012-02-20
* */
var CookieUtil = CookieUtil || {};
    CookieUtil = {
        get : function( name ){
            var _cookieName = encodeURIComponent(name) + "=",
                _cookieStart = document.cookie.indexOf( _cookieName ),
                _cookieValue = null;
            if( _cookieStart >-1 ){
                var _cookieEnd = document.cookie.indexOf(";",_cookieStart);
                if( _cookieEnd == -1 ){
                    _cookieEnd = document.cookie.length;
                }
                _cookieValue = decodeURIComponent( document.cookie.substring( _cookieStart + _cookieName.length,_cookieEnd ));
            }
            return _cookieValue;
        },
        set : function( name,value,expires,path,domain,secure ){
            var _cookieText = encodeURIComponent( name ) + "=" + encodeURIComponent( value );
            if( expires instanceof Date ){
                _cookieText +="; expires=" + expires.toGMTString();
            }
            if( path ){
                _cookieText +="; path=" + path;
            }
            if( domain ){
                _cookieText +="; domain=" + domain;
            }
            if( secure ){
                _cookieText +="; secure=" + secure;
            }
            document.cookie = _cookieText;
        },
        unset : function( name,value,expires,path,domain,secure ){
            this.set(name,"",new Date(0),path,domain,secure);
        }
    }
