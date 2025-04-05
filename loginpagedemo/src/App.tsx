import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes,Route} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import OTPVerfication from './Pages/OtpVerification';
import LoggedInPage from './Pages/LoggedInPage';


const App = () => {
  return (
    <>

    <Routes>
      <Route path='/' element={<LoginPage></LoginPage>}></Route>
      <Route path='/otppage' element={<OTPVerfication></OTPVerfication>}></Route>
      <Route path='/homepage' element={<LoggedInPage></LoggedInPage>}></Route>
    </Routes>

    </> 
  )
}

export default App