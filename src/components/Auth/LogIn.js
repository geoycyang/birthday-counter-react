import {auth, signInWithEmailAndPassword, db, ref, get, child} from '../../module/firebase'
import {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
const Login = ({ onLogin })=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()

    const loginUser = (e)=>{
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log(userCredential.user)
            const userKey = userCredential.user.uid
            const dbRef = ref(db)
            get(child(dbRef, `Users/${userKey}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    let user = snapshot.val().FirstName
                    localStorage.setItem('username', user.FirstName)
                    console.log(user.FirstName)
                    onLogin(user);
                     


                } else {
                  console.log("No data available");
                }
              }).catch((error) => {
                console.error(error);
              });
        })
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <h1 className="text-center fst-italic">Login</h1>
                    <form action="" className="bg-light p-3 rounded-3 shadow">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="">Email:</label>
                            <input className="form-control" type="email" size="30" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="">Password:</label>
                            <input className="form-control" type="password" size="30" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}}/>
                        </div>

                        <div className="d-flex justify-content-between">
                            <Link to="/signup" className="text-decoration-none text-success ">Create a new account</Link>
                            <button className="btn btn-secondary my-btn-color" onClick={loginUser}>Log In</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Login
