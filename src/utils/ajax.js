import {message} from 'antd';

let postRequest_v2 = (url, data, callback) => {
    var formData = new FormData();

    for (let p in data){
        // console.log("here")
        // console.log(p)
        // console.log(data[p])
        // if(data.hasOwnProperty(p))
        formData.append(p, data[p]);
    }

    // url = url + "?id=2"


    // console.log("hh");
    // console.log(data);
    // console.log(formData.get("id"));

    let opts = {
        method: "POST",
        body: formData,
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
           console.log(error);
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest,postRequest_v2};