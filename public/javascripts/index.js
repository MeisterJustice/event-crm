// window pre loading animation
$(window).load(function() {
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");;
});

//============================================================================
//                                 SERVICES SECTION
//============================================================================
$(function() {
    // animate on scroll
    new WOW().init();
});

// login and register navbar
function onClickMenu(){
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");
	
	document.getElementById("menu-bg").classList.toggle("change-bg");
}