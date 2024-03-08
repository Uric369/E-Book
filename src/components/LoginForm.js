import React, { useState } from "react";
import { Form, Input, Button,Modal } from "antd";
import { UserOutlined, LockOutlined ,MailOutlined} from "@ant-design/icons";
import "../css/LoginView.css";
import * as userService from "../services/userService";
import { message } from "antd";

const LoginView = () => {
  const [loading, setLoading] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    userService.login(values);
  };

  const confirmPasswordValidator = (_, value, callback) => {
    const { password } = form.getFieldValue(); // Get the password value from the form
  
    if (value && value !== password) {
      callback("Passwords do not match!");
    } else {
      callback();
    }
  };
  
  
  const emailValidator = (_, value, callback) => {
    // 邮箱格式验证器
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      callback("Please enter a valid email address!");
    } else {
      callback();
    }
  };

  const onRegisterFinish = (values) => {
    console.log("Received values of form: ", values);
    const data={
      username:values.username,
      password:values.password,
      mail:values.email,
    }
    userService.createAccount(data);
    setShowRegisterForm(false);
  };


  const toggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleCancel = () => {
    setShowRegisterForm(false);
  };

  return (
    <div>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 300 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ width: "100%" }}
              className="login-btn"
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <a href="#" onClick={toggleRegisterForm}>
              Create an account
            </a>{" "}
            | <a href="#">Forget password</a>
          </Form.Item>
        </Form>




        <Modal title="Add New Book" visible={showRegisterForm} footer={null} onCancel={handleCancel}>
<Form form={form} name="register" onFinish={onRegisterFinish} style={{ width: 300 }}>
<Form.Item
      name="username"
      rules={[{ required: true, message: "Please input your username!" }]}
    >
      <Input prefix={<UserOutlined />} placeholder="Username" />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[{ required: true, message: "Please input your password!" }]}
    >
      <Input.Password prefix={<LockOutlined />} placeholder="Password" />
    </Form.Item>
    <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
              { validator: confirmPasswordValidator },
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: "Please enter a valid email address!",
          validator: emailValidator,
        },
      ]}
    >
      <Input prefix={<MailOutlined />} placeholder="Email" />
    </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            Already have an account?{" "}
            <a href="#" onClick={toggleRegisterForm}>
              Log in
            </a>
          </Form.Item>
        </Form>
</Modal>


        </div>
  );
};

export default LoginView;
