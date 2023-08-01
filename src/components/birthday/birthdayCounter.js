
import {Link, useHistory} from "react-router-dom"
import { auth, signOut, ref, get, db } from '../../module/firebase'
import { useState, useEffect } from 'react'


function BirthdayCountdown() {
    const [daysLeft, setDaysLeft] = useState(0);
    const [username, setUsername] = useState('');
    const [birthday, setBirthday] = useState(new Date());
    const [quote, setQuote] = useState('');


    useEffect(() => {
        const getUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = ref(db, 'Users/' + user.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUsername(snapshot.val().FirstName);
                    setBirthday(new Date(snapshot.val().Birthday));
                } else {
                    console.log("No data available");
                }
            }
        }
        getUserData();
    }, []);

    async function fetchQuote() {
        const response = await fetch('https://type.fit/api/quotes');
        const data = await response.json();
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        setQuote(randomQuote); 
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const birthdayThisYear = new Date(new Date().getFullYear(), birthday.getMonth(), birthday.getDate());
            let diff = birthdayThisYear - new Date();
            if (diff < 0) {
                // birthday passed already this year, calculate for next year
                const birthdayNextYear = new Date(new Date().getFullYear() + 1, birthday.getMonth(), birthday.getDate());
                diff = birthdayNextYear - new Date();
            }
            const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
            setDaysLeft(days);

            if(days === 0){
                fetchQuote();
            }

        }, 1000);
        return () => clearInterval(timer);
    }, [birthday]);




    

    return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h2 className="mb-4">Welcome {username}</h2>
            {daysLeft !== 0 && <p>{daysLeft} days until your next birthday.</p>}
            {daysLeft === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h2 className="mb-4">Happy Birthday! 🎉</h2>
            <p>Here's a quote for you: "{quote.text}" - {quote.author}</p>
        </div>
        )}
    </div>
    );
}


export default BirthdayCountdown;