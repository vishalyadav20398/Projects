function login() {
   // Get user input
   const email = document.getElementById('login-email').value;
   const password = document.getElementById('login-password').value;
   const loginForm = document.getElementById('login-form');
   const loginMsg = document.getElementsByClassName('login-msg')[0];

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
         var response = JSON.parse(this.responseText);
         window.location.href = response.profileUrl;
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
   const signupMsg = document.getElementsByClassName('signup-msg')[0];
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
         signupMsg.innerHTML = "Signed Up Successfully!"
         var response = JSON.parse(this.responseText);
         window.location.href = response.profileUrl;
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