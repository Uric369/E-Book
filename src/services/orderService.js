import { message } from "antd";
import {postRequest, postRequest_v2} from "../utils/ajax";
import { createWebSocket,closeWebSocket } from "./WebSocket4order";
import config from "../config";

export const getOrdersByUser = ({ search }, callback) => {
    const data = { userId: search };
    // const url = `${config.apiUrl}/getOrdersByUser`;
    const url = `http://localhost:8080/getOrdersWithDetailsByUser`;
    console.log("getOrdersByUser");
    console.log(data);
    postRequest_v2(url, data, callback);
    console.log("service");
    console.log(data);
  };

  export const addOrder = (orderDto, callback) => {
    const serviceUrl = `${config.serviceBaseUrl}/addOrder`;
    console.log("addOrder");
  
    function webSocketCallback(data){
      const socketURL = `${config.webSocketBaseUrl}/${orderDto.order.userId.toString()}`;
      createWebSocket(socketURL, (info) => {
        const feedback = JSON.parse(info.data);
        if(feedback.status >= 0) {
          message.success("WebSocket Message: " + data.msg);
          console.log(data.msg);
        } else {
          message.error("WebSocket Message: "+ data.msg);
        }
        closeWebSocket();
      })
    }
    postRequest(serviceUrl, orderDto, webSocketCallback);
  }
  
  export const getOrderItemsWithDetailsByOrder = (orderId, callback) => {
    const data = {orderId: orderId};
    console.log("orderId in service");
    console.log(orderId);
    // const url = `${config.apiUrl}/getOrdersByUser`;
    const url = `http://localhost:8080/getOrderItemsWithDetailsByOrder`;
    postRequest_v2(url, data, callback);
    console.log("data here");
    console.log(data);
  
  };


  export const  getUserOrdersByBookName= (userId,subString, callback) => {
    const data = {userId:userId,subString:subString};
    console.log(data);
    console.log("getOrdersByBookName");
    const url = `http://localhost:8080/getUserOrdersByBookName`;
    postRequest_v2(url, data, callback);
};

export const getUserOrdersByTime = (userId,startTime,endTime, callback) => {
  const data = {userId:userId,startTime: startTime,endTime:endTime};
  const url = `http://localhost:8080/getUserOrdersByTime`;
  postRequest_v2(url, data, callback);
};


export const  getAllOrdersByBookName= (subString, callback) => {
  const data = {subString:subString};
  console.log(data);
  console.log("getAllOrdersByBookName");
  const url = `http://localhost:8080/getAllOrdersByBookName`;
  postRequest_v2(url, data, callback);
};

export const getAllOrdersByTime = (startTime,endTime, callback) => {
  const data = {startTime: startTime,endTime:endTime};
  const url = `http://localhost:8080/getAllOrdersByTime`;
  postRequest_v2(url, data, callback);
};

export const getAllOrders = (data, callback) => {
  // const url = `${config.apiUrl}/getBooks`;
  const url = `http://localhost:8080/getAllOrders`;
  postRequest(url, data, callback);
};