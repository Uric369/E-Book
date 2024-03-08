import { postRequest_v2 } from "../utils/ajax";
export const getCartsByUser = ({ search }, callback) => {
    const data = { userId: search };
    // const url = `${config.apiUrl}/getOrdersByUser`;
    const url = `http://localhost:8080/getCartsByUser`;
    // console.log("getOrdersByUser");
    // console.log(data);
    postRequest_v2(url, data, callback);
    // console.log("service");
    // console.log(data);
  };


  export const addCart = (cartDto, callback) => {
    const url = `http://localhost:8080/addCart`;
    console.log("addCart");
  
    postRequest_v2(url, cartDto, callback);
  }


  export const removeCartsByUser = (userId, callback) => {
    const data = { userId: userId };
    // const url = `${config.apiUrl}/getOrdersByUser`;
    const url = `http://localhost:8080/removeCartsByUser`;
    // console.log("getOrdersByUser");
    // console.log(data);
    postRequest_v2(url, data, callback);
    // console.log("service");
    // console.log(data);
  };
  