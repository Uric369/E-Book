// import config from 'config';
import { message } from "antd";
import {postRequest, postRequest_v2} from "../utils/ajax";
import config from "../config";


export const getBooks = (data, callback) => {
    // const url = `${config.apiUrl}/getBooks`;
    const url = `http://localhost:8020/getBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    const data = {id: id};
    // const url = `${config.apiUrl}/getBook`;
    const url = `http://localhost:8020/getBook`;
    postRequest_v2(url, data, callback);

};

export const addBook = (Book,callback) => {
    const url = `http://localhost:8080/addBook`;
    postRequest(url, Book, callback);
    console.log("addBook");
    
  }

  export const deleteBook = (id, callback) => {
    const data = {id: id};
    console.log("deleteBook");
    const url = `http://localhost:8080/deleteBook`;
    postRequest_v2(url, data, callback);
};

export const restoreBook = (id, callback) => {
    const data = {id: id};
    console.log("restoreBook");
    const url = `http://localhost:8080/restoreBook`;
    postRequest_v2(url, data, callback);
};

export const shredBook = (id, callback) => {
    const data = {id: id};
    console.log("shredBook");
    const url = `http://localhost:8080/shredBook`;
    postRequest_v2(url, data, callback);
};


export const editBook = (Book,callback) => {
    const url = `${config.serviceBaseUrl}/editBook`;
    postRequest(url, Book, callback);
    console.log("editBook");
    
  }

  export const getBookHotSellingList = (startTime,endTime, callback) => {
    const data = {startTime: startTime,endTime:endTime};
    const url = `http://localhost:8080/BookHotSellingList`;
    postRequest_v2(url, data, callback);
};

export const  getBooksByName= (subString, callback) => {
    const data = {subString:subString};
    console.log(data);
    console.log("getBooksByName");
    const url = `http://localhost:8020/searchBookByName`;
    postRequest_v2(url, data, callback);
  };

  export const  fuzzySearchByTag= (subString, callback) => {
    const data = {subString:subString};
    console.log(data);
    console.log("fuzzySearchByTag");
    const url = `http://localhost:8020/fuzzySearchByTag`;
    postRequest_v2(url, data, callback);
  };

  export const  getAuthorByBookName= (bookname, callback) => {
    const data = {bookname:bookname};
    const url = `http://localhost:8080/microservice/getBookAuthorByName`;
    postRequest_v2(url, data, callback);
  };