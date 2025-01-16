See Deployed here:
[https://playing-with-firebase-fc286.web.app/](https://playing-with-firebase-fc286.web.app/)

These are the steps I used to create - if you clone, you will need o create a project in firebase:

SETUP STEPS

1. create acount and add project on firebase
 here is link for setting up a project for oauth
 https://console.firebase.google.com/u/0/project/_/authentication/users

2. npm install firebase-tools -g

3. firebase login 

4. firebase init hosting
 -> go through menus, can start public as root directory, its easy to change later in 
 firebase.json -> "public" : "PATH"

5. delete boilerplate "hosted with firebase blah blah blah"

6. in index.html, add:
 <script src="app.js">
 </script>
 then, in terminal:
 touch public/app.js
 creates app.js file for scripts 

7. add functions in JS and call on button press and voila

8. in terminal, "firesbase serve" to serve locally or "firebase deploy" to deploy to web

EXTRA NOTES: 
* I had minor issues with logging in with GitHub when i had already used that account for Google
 what I did is i just redirect to login with Google if the user tries to login with github 
after previously having logged in with google on same email

*if we want to add custom domain, its under project overview -> deployed

* much of this was done in following [this](https://youtu.be/9kRgVxULbag?si=eBhFdd51bZSWBP8u) video - a bit outdated but worked mostly for simple authentication.

See more comments in public/app.js

