firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      document.getElementById("user_div").style.display = "block";
      document.getElementById("login_div").style.display = "none";

      var user = firebase.auth().currentUser;

    if (user!=null){
        var email_id=user.email;
        var txt = `Welcome ${email_id}`;
        document.getElementById("user_para").innerHTML = txt ;
    }
    } else {
      // No user is signed in.
      document.getElementById("login_div").style.display = "block";
      document.getElementById("user_div").style.display = "none";
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