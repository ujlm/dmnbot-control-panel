import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const auth = getAuth();
    const navigate = useNavigate();

    const createUser = (event) => {
        event.preventDefault();
    
        createUserWithEmailAndPassword(auth, event.target.email.value, event.target.password.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          console.log(user.uid);
          navigate('/', {state: {success: "Account created: " + user.email}});
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });    
    };
    
    // KU Leuven only email pattern matching
    return(
        <div className='container'>
            <section className='optionGroup'>
                <h2>Create an account</h2>
                <form onSubmit={createUser}>
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
                    <center><input type='submit' className='btn' value='Create user' /></center>
                </form>
            </section>
        </div>
    );
}

export default SignUp;