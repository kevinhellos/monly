import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export async function useSignInWithGoogle(){
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!result) {
        console.error("Error: failed logging in...");
      }
      // const token = credential.accessToken;.
      // const user = result.user;
    }).catch((error) => {
        console.error(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
    });
}