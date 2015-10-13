;(function($){
  function sliderTo(element,index){
    var sliderCount = element.find('li').length;
    element.find('ul').css({
        transform: 'translateX(-' + 100 / sliderCount * (index-1) + '%)',
        '-webkit-transform': 'translateX(-' + 100 / sliderCount * (index-1) + '%)'
    });
    defaults.touchbacks(index);
    if(defaults.scurpage != index){
      defaults.scurpage = index;
      touchMoveStartCoordinate = touchCrossCoordinate;
    }
  }
  var defaults={
    scurpage: 0,
    height:240,
    callbacks: function() {},
    touchbacks: function() {}
  }
  var flag;
  var touchMoveStartCoordinate = {};   //touch 坐标
  var touchDistanceCoordinate = {};     //touch start 到 touch end 距离
  var touchCrossCoordinate = {};     //touch 经过 的坐标

  $.extend($.fn,{
    tinyRotaClick: function(opts) {
      var element = $(this);
      defaults = $.extend(defaults, opts);
      var s = defaults.scurpage + 1;
      sliderTo(element, s);
    },
    tinySlider : function(opts){
      defaults = $.extend(defaults,opts);
      defaults.scurpage = defaults.scurpage + 1;
      var element = $(this);
      element.css({
        position: 'relative',
        width: '100%',
        height: defaults.height+'px',
        overflow: 'hidden'
      });
      var sliderLength = element.find('li').length;
      element.find('ul').css({
        position: 'absolute',
        transform: 'translateX(0%)',
        '-webkit-transform': 'translateX(0%)',
        padding: '0px',
        margin: '0px',
        height: '100%',
        width: sliderLength + '00%'
      });
      element.find('li').css({
        width: '100%',
        height: '100%',
        padding: '0px',
        margin: '0px',
        'list-style': 'none',
        'float': 'left',
        width: 100/sliderLength+'%'
      });
      sliderTo(element, defaults.scurpage);
      defaults.callbacks();
      element[0].addEventListener('touchstart', function(e) {
        function onTouchMove(e) {
          var touch = e.touches[0];
          touchCrossCoordinate = {
            x: touch.pageX,
            y: touch.pageY
          };
          touchDistanceCoordinate = {
            x: touch.pageX - touchMoveStartCoordinate.x,
            y: touch.pageY - touchMoveStartCoordinate.y
          };
          if(Math.abs(touchDistanceCoordinate.x) < Math.abs(touchDistanceCoordinate.y)){
            flag = true;
          }
          if(flag){
            e.preventDefault();
          }
          if(touchDistanceCoordinate.x > 20){
            if(defaults.scurpage===1){
              sliderTo(element,sliderLength);
            }else{
              sliderTo(element,defaults.scurpage-1);
            }
          }else if(touchDistanceCoordinate.x < -20){
            if(defaults.scurpage===sliderLength){
              sliderTo(element,1);
            }else{
              sliderTo(element,defaults.scurpage+1);
            }
          }
        };
        function onTouchEnd() {
          element[0].removeEventListener("touchmove", onTouchMove, false),
          element[0].removeEventListener("touchend", onTouchEnd, false)
        }
        var touch = e.touches[0];
        touchMoveStartCoordinate = {
          x: touch.pageX,
          y: touch.pageY,
          time: +new Date
        },
        //flag = void 0,
        touchDistanceCoordinate = {};
        element[0].addEventListener("touchmove", onTouchMove, false);
        element[0].addEventListener("touchend", onTouchEnd, false);
      },false);
    }
  });
})(Zepto);


