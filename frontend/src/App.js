import './App.css';
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import MainLoggedIn from './pages/MainLoggedIn';
import Footer from './components/Footer'
import ForgotPassword from './pages/ForgotPassword';
import ChangePassword from './pages/ChangePassword';
import AdminLogin from './pages/AdminLogin';
import MainLoggedInAdmin from './pages/MainLoggedInAdmin';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <div className='contentWrapper'>
          <Switch>
            <Route path='/AdminLogin'>
              <AdminLogin></AdminLogin>
            </Route>
            <Route path='/changePassword'>
              <ChangePassword></ChangePassword>
            </Route>
            <Route path='/forgotPassword'>
              <ForgotPassword></ForgotPassword>
            </Route>
            <Route path='/mainLoggedIn'>
              <MainLoggedIn></MainLoggedIn>
            </Route>
            <Route path='/mainLoggedInAdmin'>
              <MainLoggedInAdmin></MainLoggedInAdmin>
            </Route>
            <Route exact path='/login'>
              <Login></Login>
            </Route>
            <Route exact path='/signup'>
              <Signup></Signup>
            </Route>
            <Route exact path='/'>
              <Home></Home>
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div >
  );
}

export default App;
