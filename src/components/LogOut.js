import { getAuth, signOut } from "firebase/auth";

function LogOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
}

export default LogOut;