import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import EntryNavbar from './common/EntryNavbar/EnterNavbar';
import LandingPage from './Pages/LandingPage/LandinagePage';
import Registration from './Pages/Registration/Registration';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './Pages/Login/Login';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import Feed from './Pages/FeedPage/Feed';
import Post from './Pages/Post/Post';
import {SocketProvider} from './context/Socketcontext'
import Messenger from './Pages/MessengerPage/Messenger';
import Chatpage from './Pages/Chatpage/Chatpage';
import Report from './Pages/AccountPage/report/Report';
import Schedular from './Pages/Schedular/Schedular';
import Payments from './Pages/Payments/Payments';
import Notificationscontent from './Pages/Notification/Notificationscontent';
import Notifications from './Pages/Notification/Notifications';
import Subscription from './Pages/Subscription/Subscription';
import Search from './Pages/Searchpage/Search';
import CreatorProfile from './Pages/CreatorProfile/CreatorProfile';
import Account from './Pages/AccountPage/Account/Account';
import Purcasehistory from './Pages/AccountPage/Purchasehistory/Purchasehistory';
import Connectiondata from './Pages/AccountPage/Connection data/Connectiondata';
import Mysubscriptions from './Pages/AccountPage/Mysubscriptions/Mysubscriptions';
import NotificationPrefrences from './Pages/AccountPage/NotificationPrefrences/NotificationPrefrences';
import Personalinformation from './Pages/AccountPage/Personal information/Personalinformation';
import InvoiceComponent from './Pages/AccountPage/Purchasehistory/Invoicecomponent';
import Subinfo from './Pages/Subscription/Subinfo';
import Middleware from './middleware/Middleware';
function App() {
  return (
    <GoogleOAuthProvider clientId="221019183179-c1hrss3njcku28m1mpa0qout2o7qt1uq.apps.googleusercontent.com">
    
    
  
    <Router>
      <SocketProvider>

      <Routes>

<Route path='/' element={<LandingPage></LandingPage>}></Route>

<Route path='/login' element={<Login></Login>}></Route>
<Route path='/register' element={<Registration></Registration>}></Route>
<Route path='/forget-password' element={<ForgetPassword></ForgetPassword>}></Route>
<Route path='/reset-password' element={<ResetPassword></ResetPassword>}></Route>
  <Route element={<Middleware/>}>
    
<Route path='/feed' element={<Feed></Feed>}>


</Route>
<Route path='/payments' element={<Payments/>}/>
<Route path='/post/:id' element={<Post></Post>}></Route>  
<Route path='/messenger' element={<Messenger></Messenger>}/>
<Route path='/chat' element={<Chatpage/>}/>
<Route path='/schedule' element={<Schedular/>}></Route>
  <Route path='/notifications' element={<Notifications/>}/>
  <Route path='/subscriptions' element={<Subscription/>}/>
  <Route path='/search' element={<Search/>}></Route>
  <Route path='/creator' element={<CreatorProfile/>}/>
  <Route path='/account' element={<Account/>}/>
  <Route path="/purchase-history" element={<Purcasehistory/>}/>
  <Route path='/connection-data' element={<Connectiondata/>}/>
  <Route path='/mysubscriptions' element={<Mysubscriptions/>}/>
  <Route path='/notification-prefrences' element={<NotificationPrefrences/>}/>
  <Route path='/personal-information' element={<Personalinformation/>}/>
  <Route path='/invoice-component' element={<InvoiceComponent/>}/>
  <Route path='/report' element={<Report/>}/>
  <Route path='/subinfo' element={<Subinfo/>}/>
  </Route>
      </Routes>
      </SocketProvider>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
