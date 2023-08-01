
import './App.css';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/LogIn';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BirthdayCountdown from './components/birthday/birthdayCounter';

function App() {
  const [user, setUser] = useState(null); // null means no user is logged in

  const handleLogin = (user) => {
    setUser(user); // set the logged in user
  };

  const handleLogout = () => {
    setUser(null); // log out the user
  };

  return (
    <Router>
      <div>
        <h1 className="text-center">Birthday Countdown</h1>
        {!user && (
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login onLogin={handleLogin} />
            </Route>
          </Switch>
        )}
        {user && (
          <div>
          
            <div className="d-flex">
                <button onClick={handleLogout} className="btn btn-secondary mt-auto">Logout</button>
            </div>
            <Switch>
            <BirthdayCountdown birthday={new Date(user.birthday)} />
          </Switch>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;