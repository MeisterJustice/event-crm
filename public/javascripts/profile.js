let newPasswordValue;
let confirmationValue;
const submitBtn = document.getElementById('update-profile');
const newPassword = document.getElementById('new-password');
const confirmation = document.getElementById('password-confirmation');
const validationMessage = document.getElementById('validation-message');
function validatePasswords(message, add, remove) {
		validationMessage.textContent = message;
		validationMessage.classList.add(add);
		validationMessage.classList.remove(remove);
}
confirmation.addEventListener('input', e => {
	newPasswordValue = newPassword.value;
	confirmationValue = confirmation.value;
	if (newPasswordValue !== confirmationValue) {
	  validatePasswords('Passwords must match!', 'text-danger', 'text-success');
	  submitBtn.setAttribute('disabled', true);
	} else {
		validatePasswords('Passwords match!', 'text-success', 'text-danger');
	  submitBtn.removeAttribute('disabled');
	}
});

// window pre loading animation
$(window).load(function () {
	// Animate loader off screen
	$(".se-pre-con").fadeOut("slow");;
});

function onClickMenu() {
	document.getElementById("menu").classList.toggle("change");
	document.getElementById("nav").classList.toggle("change");

	document.getElementById("menu-bg").classList.toggle("change-bg");
}