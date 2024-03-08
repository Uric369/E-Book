import React from "react";
import Homepage from "./Homepage";
import AdminHome from "./AdminHome";

const userData = JSON.parse(localStorage.getItem("user"));

const Home =()=> {
  if (!userData || userData.userType !== 0) {
    return <Homepage />;
  } else {
    return <AdminHome />;
  }
}

export default Home;