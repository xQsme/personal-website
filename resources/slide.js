var slideIndex = 0;
var playing = true;
var timeout;
showSlides();
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