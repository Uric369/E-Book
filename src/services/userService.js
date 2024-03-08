// import config from 'config';
import {postRequest,postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import { Navigate } from "react-router-dom";
// import { navigate } from 'gatsby';
// import { navigate } from 'gatsby-link';



export const login = (data) => {
    const url = `http://localhost:8020/login`;
    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data));
            history.push("/Homepage");
            window.location.reload();
           
            message.success(data.msg);
            console.log(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `http://localhost:8020/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            
            
            // message.success(data.msg);
            console.log(data.data);
            message.success("您已经安全退出！"+ data.data.duration.seconds + "s");
            
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `http://localhost:8080/checkSession`;
    postRequest(url, {}, callback);
};

export const getUserByUserId = (userId, callback) => {
    const data = { userId: userId };
    // const url = `${config.apiUrl}/getBook`;
    const url = `http://localhost:8020/getUserByUserId`;
    postRequest_v2(url, data, callback);
  };


  export const getAllUserAuth = (data, callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8080/getAllUserAuth`;
    postRequest(url, data, callback);
    console.log("service here!")
};

export const updateAvatar = (userId, avatar, callback) => {
    const data = {userId:userId, avatar: avatar};
    const url = `http://localhost:8020/updateAvatar`;
    console.log(data);
    postRequest_v2(url, data, callback);
}

export const disableUser = (userId, callback) => {
    const data = {userId: userId};
    console.log("disableUser");
    const url = `http://localhost:8080/disableUser`;
    postRequest_v2(url, data, callback);
};

export const unblockUser = (userId, callback) => {
    const data = {userId: userId};
    console.log("unblockUser");
    const url = `http://localhost:8080/unblockUser`;
    postRequest_v2(url, data, callback);
};


export const getUserSpendingList = (startTime,endTime, callback) => {
    const data = {startTime: startTime,endTime:endTime};
    const url = `http://localhost:8080/UserSpendingList`;
    postRequest_v2(url, data, callback);
};

export const getPchsStatsByBook = (userId,startTime,endTime, callback) => {
    console.log(userId);
    const data = {userId:userId,startTime: startTime,endTime:endTime};
    console.log(data);
    const url = `http://localhost:8080/PurchaseStatsByUser`;
    postRequest_v2(url, data, callback);
};

export const getPchsStatsByBook2 = (userId,startTime,endTime, callback) => {
    console.log(userId);
    const data = {userId:userId,startTime: startTime,endTime:endTime};
    console.log(data);
    const url = `http://localhost:8080/PurchaseStatsByUser2`;
    postRequest_v2(url, data, callback);
};


export const createAccount = (data) => {
    const url = `http://localhost:8080/createAccount`;
    const callback = (data) => {
        if(data.status >= 0) {
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};