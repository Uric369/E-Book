import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import { Button, message, Upload } from "antd";
import { updateAvatar } from "../services/userService";

const userData = JSON.parse(localStorage.getItem("user"));
const props = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text"
  },
  beforeUpload: (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Get the full base64 string
      const base64 = reader.result;
      // Call the backend API to update the avatar
      updateAvatar(userData.userId, base64, (res) => {
        console.log(res);
        if(res.status >= 0) {
          window.location.reload();        
          message.success(res.msg);
      }
      else{
          message.error(res.msg);
      }
      });
    };
    // Prevent antd default upload 
    return false;
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const SelectAvater = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default SelectAvater;
