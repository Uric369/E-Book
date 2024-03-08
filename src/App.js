import React from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import BookInfo from "./view/BookInfo";
import Homepage from "./view/Homepage";
import Cart from "./view/Cart";
import Profile from "./view/Profile";
import LoginView from "./view/LoginView";
import Order from "./view/Order";
import { history } from "./utils/history";
import Home from "./view/Home";
import AdminBookInfo from "./view/AdminBookInfo";
import AdminDelBook from "./view/AdminDelBook";
import AdminUserList from "./view/AdminUserList";
import AdminStatistics from "./view/AdminStatistics";
import UserStatistics from "./view/UserStatistics";
import AdminOrder from "./view/AdminOrder";
import InformationInquiry from "./view/InformationInquiry";

class App extends React.Component{
  

  constructor(props) {
            super(props);
    
            history.listen((location, action) => {
                // clear alert on location change
                console.log(location,action);
            });
        }

  render(){
    return(
    <Router history={history}>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/Homepage" element={<Home/>} />
        <Route path="/BookInfo/:id" element={<BookInfo />} />
        <Route path="/AdminBookInfo/:id" element={<AdminBookInfo />} />
        <Route path="/AdminDelBooks" element={<AdminDelBook />} />
        <Route path="/AdminUserList" element={<AdminUserList />} />
        <Route path="/AdminStatistics" element={<AdminStatistics />} />
        <Route path="/AdminOrder" element={<AdminOrder />} />
        <Route path="/UserStatistics" element={<UserStatistics />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/InformationInquiry" element={<InformationInquiry />} />
        <Route path="/*" element={<Navigate to="/Homepage" />} />
      </Routes>
    </Router>
    );
  };
}

export default App;