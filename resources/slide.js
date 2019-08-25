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
    swipe_det.sX = 0;
    swipe_det.eX = 0;
    var min_x = 30;  //min x swipe for horizontal swipe
    var direc = null;
    ele = document.getElementById(el);
    ele.addEventListener('touchstart',function(e){
      var t = e.touches[0];
      swipe_det.sX = t.screenX; 
    },false);
    ele.addEventListener('touchmove',function(e){
      var t = e.touches[0];
      swipe_det.eX = t.screenX;   
    },false);
    ele.addEventListener('touchend',function(e){
      if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && (swipe_det.eX > 0))) {
        if(swipe_det.eX > swipe_det.sX)
        {
            direc = true;
        } 
        else 
        {
            direc = false;
        }
      }
      if (direc !== null) {
        if(typeof func == 'function') func(direc);
      }
      direc = null;
      swipe_det.sX = 0;
      swipe_det.eX = 0;
    },false);  
  }
  
  function onSwipe(d) {
    if(d)
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