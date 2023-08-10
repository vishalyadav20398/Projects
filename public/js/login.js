function login() {
   // Get user input
   const email = document.getElementById('login-email').value;
   const password = document.getElementById('login-password').value;
   const loginForm = document.getElementById('login-form');
   
   let xhr = new XMLHttpRequest();
   let url = loginForm.attributes['data-url'].nodeValue;
   let data = {
      email: email,
      password: password
   };
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         console.log(this.responseText);
      }
   }
   xhr.send(JSON.stringify(data));
}

function signup() {
   // Get user input
   const name = document.getElementById('signup-name').value;
   const email = document.getElementById('signup-email').value;
   const password = document.getElementById('signup-password').value;
   const signupForm = document.getElementById('signup-form');
   let xhr = new XMLHttpRequest();
   let url = signupForm.attributes['data-url'].nodeValue;
   let data = {
      name: name,
      email: email,
      password: password
   };
   xhr.open("POST", url, true);
   xhr.setRequestHeader("Content-Type", "application/json");
   xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
         console.log(this.responseText);
      }
   }
   xhr.send(JSON.stringify(data));
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