var slideIndex = 0;
var playing = true;
var timeout;
showSlides();
window.onload = function() {
    detectswipe('slides', onSwipe);
}
function showSlides()
{
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    if(playing)
    {
        timeout=setTimeout(showSlides, 4000); // Change image every 3 seconds
    }
}
function clickDot(i)
{
    slideIndex=i;
    clearTimeout(timeout);
    showSlides();
}
function playPause()
{
    let old=playing;
    playing=!playing;
    if(old)
    {
        clearTimeout(timeout);
    }
    else
    {
        showSlides();
    }
}
function switchSlide(event)
{
    switch(event.keyCode)
    {
        case 37:
            slideIndex-=2;
            clearTimeout(timeout);
            showSlides(); 
        break;
        case 39:
            clearTimeout(timeout);
            showSlides(); 
        break;
    }
}
function detectswipe(el,func) {
    swipe_det = new Object();
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    var min_x = 30;  //min x swipe for horizontal swipe
    var max_x = 30;  //max x difference for vertical swipe
    var min_y = 50;  //min y swipe for vertical swipe
    var max_y = 60;  //max y difference for horizontal swipe
    var direc = "";
    ele = document.getElementById(el);
    ele.addEventListener('touchstart',function(e){
      var t = e.touches[0];
      swipe_det.sX = t.screenX; 
      swipe_det.sY = t.screenY;
    },false);
    ele.addEventListener('touchmove',function(e){
      e.preventDefault();
      var t = e.touches[0];
      swipe_det.eX = t.screenX; 
      swipe_det.eY = t.screenY;    
    },false);
    ele.addEventListener('touchend',function(e){
      //horizontal detection
      if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
        if(swipe_det.eX > swipe_det.sX) direc = "r";
        else direc = "l";
      }
      //vertical detection
      else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
        if(swipe_det.eY > swipe_det.sY) direc = "d";
        else direc = "u";
      }
  
      if (direc != "") {
        if(typeof func == 'function') func(el,direc);
      }
      direc = "";
      swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
    },false);  
  }
  
  function onSwipe(el,d) {
    if(d == "l")
    {
        slideIndex-=2;
        clearTimeout(timeout);
        showSlides(); 
    }
    else
    {
        clearTimeout(timeout);
        showSlides(); 
    }
  }