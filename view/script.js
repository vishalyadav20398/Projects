function login() {
   // Get user input
   const email = document.getElementById('login-email').value;
   const password = document.getElementById('login-password').value;
   
   // Perform login action (e.g., AJAX request to your backend)
   // ...
   console.log(`Login with Email: ${email}, Password: ${password}`);
}

function signup() {
   // Get user input
   const name = document.getElementById('signup-name').value;
   const email = document.getElementById('signup-email').value;
   const password = document.getElementById('signup-password').value;
   
   // Perform signup action (e.g., AJAX request to your backend)
   // ...
   console.log(`Signup with Name: ${name}, Email: ${email}, Password: ${password}`);
}

function toggle(input) {
	const loginForm = document.getElementById('login-form');
	const signupForm = document.getElementById('signup-form');
	if (input) {
		loginForm.style.display = "block";
		signupForm.style.display = "none";
	} else {
		loginForm.style.display = "none";
		signupForm.style.display = "block";
	}
}