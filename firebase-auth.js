import { getFirebaseConfig } from "./firebase-config.js";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

(async () => {
    const firebaseConfig = await getFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const providerGoogle = new GoogleAuthProvider();
    const providerGitHub = new GithubAuthProvider();

    window.signInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
            .then(result => {
                console.log("Google Auth:", result.user);
                document.getElementById("user-name").innerHTML = `Welcome, ${result.user.displayName}`;
                document.getElementById("button-container").style.display = "none";
                document.getElementById("logout-container").style.display = "block";
            })
            .catch(error => {
                console.error("Error Google Auth:", error);
            });
    };

    window.signInWithGitHub = () => {
        signInWithPopup(auth, providerGitHub)
            .then(result => {
                console.log("GitHub Auth:", result.user);
                document.getElementById("user-name").innerHTML = `Welcome, ${result.user.displayName}`;
                document.getElementById("button-container").style.display = "none";
                document.getElementById("logout-container").style.display = "block";
            })
            .catch(error => {
                console.error("Error GitHub Auth:", error);
            });
    };

    window.signOut = async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada");
            document.getElementById("button-container").style.display = "flex";
            document.getElementById("logout-container").style.display = "none";
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("Usuario autenticado:", user.displayName);
            document.getElementById("user-name").innerText = `Welcome, ${user.displayName}`;
            document.getElementById("button-container").style.display = "none";
            document.getElementById("logout-container").style.display = "block";
        } else {
            document.getElementById("user-name").innerText = "";
            document.getElementById("button-container").style.display = "flex";
            document.getElementById("logout-container").style.display = "none";
        }
    });
})();