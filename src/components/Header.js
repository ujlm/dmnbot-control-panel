import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const navigate = useNavigate();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Signed out');
      // Redirect in page itself
      //navigate('/SignIn', {state:{email: "test@student.kuleuven.be"}});
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  };

  return(
      <header>
        <a href="/" className='brand'>DMN Bot</a>
        <a href="/" onClick={logOut} className='signout'>Sign Out</a>
      </header>
  );
}

export default Header;