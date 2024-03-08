import React from "react";
import LoginForm from "../components/LoginForm";
// import WrappedLoginForm from "../components/LoginForm";
import "../css/LoginView.css";

class LoginView extends React.Component {
  render() {
    return (
      <div className="login-view-container">
        <div className="login-form-container">
          <h1>Welcome Back</h1>
          <LoginForm/>
        </div>
      </div>
    );
  }
}

export default LoginView;

// import { useState } from 'react';
// import React from 'react';
// import { Layout, Input, Button, Alert } from 'antd';
// import { Navigate } from 'react-router-dom';

// const { Content } = Layout;

// const LoginView = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const [errorMessage, setErrorMessage] = useState('');
//   const [redirectToHome, setRedirectToHome] = useState(false);

//   const handleLogin = () => {
//     if (username === 'root' && password === 'root') {
//       setRedirectToHome(true);
//     } else {
//       setErrorMessage('用户名或密码错误！');
//     }
//   };
  
//   return (
//     <Layout>
//       <Content>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '100vh',
//           }}
//         >
//           <div style={{ width: 300 }}>
//             <Input
//               placeholder="请输入用户名"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               style={{ marginBottom: 20 }}
//             />

//             <Input.Password
//               placeholder="请输入密码"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{ marginBottom: 20 }}
//             />

//             {errorMessage && <Alert message={errorMessage} type="error" />}

//             <Button type="primary" block onClick={handleLogin}>
//               Log In
//             </Button>

//           </div>
//         </div>
//       </Content>

//       {redirectToHome && <Navigate to="/Homepage" />}
//     </Layout>
//   );
// };

// export default LoginView;





// import { useState } from 'react';
// import React from 'react';
// import { Layout, Form, Input, Button } from 'antd';
// import { Navigate } from 'react-router-dom';

// const { Content } = Layout;

// const LoginView = () => {
//   // 定义用户名和密码的相关状态
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   // 定义是否跳转到首页的状态
//   const [redirectToHome, setRedirectToHome] = useState(false);

//   // 处理登录操作的函数
//   const handleLogin = (values) => {
//     // 检查用户名和密码是否正确
//     if (values.username === 'root' && values.password === 'root') {
//       // 登录成功，设置跳转标志为 true
//       setRedirectToHome(true);
//     }
//   };

//   return (
//     <Layout>
//       <Content>
//         <div
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             minHeight: '100vh',
//           }}
//         >
//           <Form onFinish={handleLogin}>
//             <Form.Item
//               label="Username"
//               name="username"
//               rules={[{ required: true, message: 'Please input your username!' }]}
//             >
//               <Input />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[{ required: true, message: 'Please input your password!' }]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Log In
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </Content>

//       {/* 如果 redirectToHome 为 true，则重定向到首页 */}
//       {redirectToHome && <Navigate to="/Homepage" />}
//     </Layout>
//   );
// };

// export default LoginView;