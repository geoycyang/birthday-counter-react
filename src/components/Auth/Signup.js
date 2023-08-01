import {useState} from 'react'
import { auth, signOut, createUserWithEmailAndPassword, db, ref, set } from '../../module/firebase'
import { useHistory } from "react-router-dom";
const Signup = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthday, setBirthday] = useState('')

    

    const history = useHistory()

    const emailChange=(e)=>{
        setEmail(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    const firstnameChange = (e) => {
        setFirstName(e.target.value)
    }
    const lastnameChange = (e) => {
        setLastName(e.target.value)
    }

    const birthdayChange = (e) => {
        setBirthday(e.target.value)
    }

    const createUser=(e)=>{
        e.preventDefault()
        console.log(email)
        console.log(password)
        console.log(firstName)
        console.log(lastName)
        console.log(birthday)
       

        const newUser = {FirstName:firstName, Email: email, Password: password, 
            Birthday:birthday }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            console.log(userCredential.user)
            // save the user into database
            const userKey = userCredential.user.uid
            set(ref(db, 'Users/' + userKey), newUser)
            .then(()=>{
                // signout
                signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    console.log('done')
                    history.push("/")
                })
                .catch((error) => {
                    console.log(error)
                });

            })
        })
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <h1 className="text-center fst-italic mt-3">Sign Up</h1>
                    <form action="" className="bg-light p-3 rounded-3 shadow m-5">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="signup-email">Email:</label>
                            <input className="form-control" id="signup-email" size='50' type="email" onChange={emailChange}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="">Password:</label>
                            <input className="form-control" type="password" size="50" onChange={passwordChange}/>
                        </div>

                        <div className="d-flex justify-content-between">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="">First name:</label>
                                <input className="form-control" type="text" onChange={firstnameChange}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="">Last name:</label>
                                <input className="form-control" type="text" onChange={lastnameChange}/>
                            </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="birthday">Birthday:</label>
                            <div className="d-flex">
                              <input 
                                className="form-control" 
                                
                                id="date-picker" 
                                type="date" 
                                name="birthday"
                                onChange={birthdayChange}
                               />
                            </div>
                        </div>
                       
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-secondary" type="submit" onClick={createUser}>Sign up</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default Signup