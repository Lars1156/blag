import React , {useState} from "react";
import {Form , Input , Button , message} from 'antd';
import axios from "axios";

const LoginPage = ()=>{
    const [loading  ,setLoading] = useState(false);
    const handleSubmit = async(values) =>{
        try {
            setLoading(true);
            const response = axios.post(' ' , values);
            message.success("Login successful!");
            const { token, role } = response.data;
            // Save the token and role to Loacal Stoarage 
            localStorage.setItem('token ' , token);
            localStorage.setItem('role ' , role);
            // Role wise redireact the Pages On the basis of role
            if (role === "admin") {
                window.location.href = "/admin-dashboard";
              } else {
                window.location.href = "/user-dashboard";
            }
           
        } catch (error) {
            const errMsg =
            error.response?.data?.message || "Login failed. Please try again.";
            message.error(errMsg);
        }
    }
    return(
        <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
        style={styles.form}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      background: "#fff",
    },
    title: {
      textAlign: "center",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
  };
export default LoginPage;