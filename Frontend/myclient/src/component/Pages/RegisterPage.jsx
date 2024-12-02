import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);
    formData.append("bio", values.bio);
    if (values.image) {
      formData.append("image", values.image.file.name);
    }

    console.log(values.image,"112");

    try {
      const response = await axios.post("http://localhost:8000/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success(response.data.msg);
      form.resetFields();
    } catch (error) {
      const errMsg =
        error.response?.data?.msg || "Error registering user. Please try again.";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h2 style={{textAlign:"center"}}>Register User</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select role">
            <Option value="admin">Admin</Option>
            <Option value="author">Auther</Option>
            <Option value="reader">Reader</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true, message: "Please enter your bio!" }]}
        >
          <Input.TextArea rows={4} placeholder="Tell us about yourself" />
        </Form.Item>

        <Form.Item label="Profile Image" name="image">
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false} 
          >
            <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
