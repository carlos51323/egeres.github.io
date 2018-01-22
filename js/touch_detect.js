
var $touchArea = $('#test'),
    touchStarted = false, // detect if a touch event is sarted
    currX = 0,
    currY = 0,
    cachedX = 0,
    cachedY = 0;

//setting the events listeners
$touchArea.on('touchstart mousedown',function (e){
    e.preventDefault();
    // caching the current x
    cachedX = e.pageX;
    // caching the current y
    cachedY = e.pageY;
    // a touch event is detected
    touchStarted = true;
    // $touchArea.text('Touchstarted');
    console.log("asadsdsa");
    // detecting if after 200ms the finger is still in the same position
    setTimeout(function (){
        currX = e.pageX;
        currY = e.pageY;
        if ((cachedX === currX) && !touchStarted && (cachedY === currY)) {
            // Here you get the Tap event
            // $touchArea.text('Tap');
            next_dialog();
        }
    },200);
});
$touchArea.on('touchend mouseup touchcancel',function (e){
    e.preventDefault();
    // here we can consider finished the touch event
    touchStarted = false;
    // $touchArea.text('Touchended');
});
$touchArea.on('touchmove mousemove',function (e){
    e.preventDefault();
    if(touchStarted) {
         // here you are swiping
         // $touchArea.text('Swiping');
    }
});
