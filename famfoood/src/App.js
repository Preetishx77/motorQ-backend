import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard'
import LandingWrapper from './components/LandingWrapper'
import Login from './components/Login'
import Signup from './components/Signup'


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingWrapper />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
    
      </>

  )
}