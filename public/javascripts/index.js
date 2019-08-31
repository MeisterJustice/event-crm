// window pre loading animation
$(window).load(function () {
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");;
});


$(function () {
	// animate on scroll
	new WOW().init();
});

// login and register navbar
function onClickMenu() {
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");

	document.getElementById("menu-bg").classList.toggle("change-bg");
}

// navbar 
$(function () {
	$(document).scroll(function () {
		const $nav = $("nav");
		$nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
	});
});

// landing page form validation
(function () {
	'use strict';
	window.addEventListener('load', function () {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		var forms = document.getElementsByClassName('needs-validation');
		// Loop over them and prevent submission
		var validation = Array.prototype.filter.call(forms, function (form) {
			form.addEventListener('submit', function (event) {
				if (form.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false);
		});
	}, false);
})();

//   ADMIN FORM
CKEDITOR.replace('description');

// lighbox
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
  });

  