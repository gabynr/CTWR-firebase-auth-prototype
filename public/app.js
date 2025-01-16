// firebase
// learned mostly from this video from fireship, which is a bit outdated:
// https://youtu.be/9kRgVxULbag?si=eBhFdd51bZSWBP8u
// firebase serve to serve to localhost
// firebase deploy to deploy to the web
// completely free until you get a bunch of users (I think >500 ish), 
// but overall the payment plan is fairly generous
// https://firebase.google.com/pricing

// THIS IS CURRENTLY DEPLOYED HERE:
// https://playing-with-firebase-fc286.web.app/

////////////////////////////////////////////////////////////////
// SETUP STEPS

// 1. create acount and add project on firebase
//  here is link for setting up a project for oauth
//  https://console.firebase.google.com/u/0/project/_/authentication/users

// 2. npm install firebase-tools -g

// 3. firebase login 

// 4. firebase init hosting
//  -> go through menus, can start public as root directory, its easy to change later in 
//  firebase.json -> "public" : "PATH"

// 5. delete boilerplate "hosted with firebase blah blah blah"

// 6. in index.html, add:
//  <script src="app.js">
//  </script>
//  then, in terminal:
//  touch public/app.js
//  creates app.js file for scripts 

// 7. add functions in JS and call on button press and voila

// * I had minor issues with logging in with GitHub when i had already used that account for Google
//  what I did is i just redirect to login with Google if the user tries to login with github 
// after previously having logged in with google on same email

// *if we want to add custom domain, its under project overview -> deployed
////////////////////////////////////////////////////////////////


// import { auth } from "/firebase.js";

// import { initializeApp } from 'firebase/app';


document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    //console.log(app);
});


// called when login with google button is pressed
function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();
    

    firebase.auth().signInWithPopup(provider)
        .then(result =>{
            const user = result.user;
            saveUserToFirestore(user);
            document.write(`Hello ${user.displayName}`)
        })
        .catch(async (error) => 
            {
                document.write(error);
            })
}

// called when login with github button is pressed
function githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            const user = result.user;
            //saveUserToFirestore(user);
            
            // console.log('User:', user);
            // console.log('Display Name:', user.displayName);
            // console.log('Email:', user.email);
            
            const name = user.displayName || user.email || "User";
            
            document.write(`Hello ${name}`);
        })
        .catch((error) => {
            console.error("bad: ", error);


            // the following from bojeil here:
            // https://stackoverflow.com/questions/44015751/firebase-js-api-auth-account-exists-with-different-credential


            // the following code prompts the user to login with google if there is an error in github signin
            // this fixed my issue where when I logged in with google first, 
            // I got an error if i later tried to login with github since Ive already used that email using a different authentication method
            // so here, it redirects to google for people to use toe correct method (the same one as they did initially)

            // this runs regardless of the type of error, which really it shouldnt

            // and this should proibably be carried over to work vice versa (if they login with github first and now they are trying to use google)
            // ^ this last point would have to be implemented in the "googleLogin" function
            firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
                .then(result =>{
                    const user = result.user;
                    document.write(`Hello ${user.displayName}`)
                    user.linkWithCredential(error.credential);
                })
                .catch(async (error) => 
                {
                        document.write(error);
                })            
            
        });
}

// called when signout is pressed
function signOut() {
    const user = firebase.auth().currentUser;
  
    if (user) {
        
     
      firebase.auth().signOut()
        .then(() => {
          console.log('User signed out successfully!');
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
    } else {
      console.log('No user is currently signed in.');
    }

  }

/*
I am trying to get these functions to work, here is the idea:

Right now, user authenticates, and then it prints their name. 
I want to make it so that when they login, their name is printed, but also saved to a "users" collection in firestore
then, once they have authenticated, the firestore gets queried for all users in the "users" collection and they get printed

Doesn't work as of now but I think this is the best way to make it work
*/

// function saveUserToFirestore(user) {
//   const userRef = db.collection("users").doc(user.uid);
//   userRef.set(
//       {
//           name: user.displayName || "Anonymous",
//           email: user.email,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp()
//       },
//       { merge: true }
//   )
//       .then(() => {
//           console.log("User information saved to Firestore.");
//       })
//       .catch((error) => {
//           console.error("Error saving user to Firestore:", error);
//       });
// }

// function viewUsers() {
//   db.collection("users")
//       .orderBy("timestamp", "desc")
//       .get()
//       .then((querySnapshot) => {
//           document.body.innerHTML = "<h1>All Users</h1>";
//           querySnapshot.forEach((doc) => {
//               const user = doc.data();
//               const userDiv = document.createElement("div");
//               userDiv.textContent = `Name: ${user.name}, Email: ${user.email}`;
//               document.body.appendChild(userDiv);
//           });
//       })
//       .catch((error) => {
//           console.error("Error fetching users from Firestore:", error);
//       });
// }

