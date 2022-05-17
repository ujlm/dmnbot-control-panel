import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const auth = getAuth();
    const navigate = useNavigate();

    const toSignUp = () => {
        navigate('/SignUp', {});
    };

    const signIn = (event) => {
        event.preventDefault();
    
        signInWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('logged in');
          console.log(user);
          console.log(user.uid);
            navigate('/', {state: {success: "Logged in as " + user.email}});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('not logged in');
          console.log(errorMessage);
        });    
    };
    
    // KU Leuven only email pattern matching
    return(
        <div className='container'>
            <section className='optionGroup'>
                <h2>Sign In</h2>
                <h5>You need to sign in to proceed</h5>
                <form onSubmit={signIn}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                <label htmlFor='email'>Email:</label>
                                </td>
                                <td>
                                <input type="email" name="email" placeholder='email' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label htmlFor='password'>Password (at least 6 characters):</label>
                                </td>
                                <td>
                                    <input type='password' name='password' />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <center><input type='submit' className='btn' value='Login' /></center>
                </form>
            </section>
            <section className='optionGroup'>
                No account? <button onClick={toSignUp} className='btn'>Create one here</button>
            </section>
        </div>
    );
}

export default SignUp;