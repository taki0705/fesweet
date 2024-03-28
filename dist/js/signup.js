let apiUser2="http://localhost:3000/user";
const username1 = document.querySelector(".sgusername");
const password1 = document.querySelector(".sgpassword");
const btnSignup = document.querySelector(".btnregister");
const registrationTab = document.querySelector('#register');

//signup

btnSignup.addEventListener("click", (e) => {
    e.preventDefault();
    if (username1.value == "" || password.value1 == "") {
      alert("Please enter your username and password");
    } else {

      const user = {
        username: username1.value,
        password: password1.value,
      };
      fetch(apiUser2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Registration failed');
        }
    })
    .then((data) => {
        // Registration successful
        console.log(data);
        alert("Registration successful!");
    })
        .catch((error) => console.error('Error:', error));
    }
  });
