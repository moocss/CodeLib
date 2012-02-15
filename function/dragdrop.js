/* *
 * 拖拽
 * 2012-02-16
* */

var DrapDrop = function(){
        var dragging = null,
            diffx = 0,
            diffy = 0;
        function handleEvent(event){
            event = EventUtil.getEvent( event );
            var target = EventUtil.getTarget( event );
            switch( event.type ){
                case "mousedown":
                    if( target.className.indexOf("draggable") > -1 ){
                        dragging = target;
                        //计算左上角与鼠标位置的距离
                        diffx = event.clientX - target.offsetLeft;
                        diffy = event.clientY - target.offsetTop;
                    }
                    break;
                case "mousemove" :
                    if( dragging !== null ){
                        event = EventUtil.getEvent(event);
                        dragging.style.left = ( event.clientX - diffx ) +"px";
                        dragging.style.top = ( event.clientY - diffy ) + "px";
                    }
                    break;
                case "mouseup" :
                    dragging = null;
                    break;
            }
        }
        return {
            enable : function(){
                EventUtil.addEvent( document,"mousedown",handleEvent);
                EventUtil.addEvent( document,"mousemove",handleEvent);
                EventUtil.addEvent( document,"mouseup",handleEvent);
            },
            disable : function(){
                EventUtil.removeEvent( document,"mousedown",handleEvent);
                EventUtil.removeEvent( document,"mousemove",handleEvent);
                EventUtil.removeEvent( document,"mouseup",handleEvent);
            }
        }
    }();