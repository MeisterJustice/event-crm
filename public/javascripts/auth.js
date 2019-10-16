$(window).load(function () {
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");;
});

function onClickMenu() {
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");

	document.getElementById("menu-bg").classList.toggle("change-bg");
}