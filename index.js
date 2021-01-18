window.onload = function() {
  render();
};

var ph = 0;
function render(){
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'invisible',
    'callback': (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      onSignInSubmit();
    }
  }); 
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";
      document.getElementById("otp").style.display = "none";

      var user = firebase.auth().currentUser;

    if (user!=null){
        var email_id=user.email;
        var txt = `Welcome ${email_id}`;
        document.getElementById("user_para").innerHTML = txt ;
      }
    } 
    
    else {
      document.getElementById("user_div").style.display = "none";
      if(!ph){
        document.getElementById("otp").style.display = "block";
        document.getElementById("login_div").style.display = "block";
      }

      else{
        document.getElementById("otp").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        

      }
      // No user is signed in.
      
      
    }
  });


function login(){
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then((user) => {
    // Signed in 
    // ...
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert(`Error : ${errorMessage} `);
    });
}

function phoneAuth() {
  
  const phoneNumber = document.getElementById('number').value;
  const appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      ph=1;
      window.alert("OTP sent");
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      window.alert(error.message);
    }); 
}

function codeVerify() {
  const code = document.getElementById('verification').value;
  confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    window.alert("success");
    const user = result.user;
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
    window.alert(error.message);
  });
}


function logout(){
    firebase.auth().signOut();
}

// var provider = new firebase.auth.GoogleAuthProvider();


// firebase.auth()
//   .signInWithPopup(provider)
//   .then((result) => {
//     /** @type {firebase.auth.OAuthCredential} */
//     var credential = result.credential;

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   });