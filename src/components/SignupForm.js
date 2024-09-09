import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { signup } from "../utils";

class SignupForm extends React.Component {
  state = {
    displayModal: false,
  };

  handleCancel = () => {
    this.setState({
      displayModal: false,
    });
  };

  signupOnClick = () => {
    this.setState({
      displayModal: true,
    });
  };

  onFinish = (data) => {
    signup(data)
      .then(() => {                 // .then, .catch, .finally后返回的都是promise
        this.setState({
          displayModal: false,
        });
        message.success(`Successfully signed up`);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  render = () => {
    return (    // Button 和 modal 并列状态
      <>
        <Button shape="round" type="primary" onClick={this.signupOnClick}>
          Register
        </Button>       
        <Modal
          title="Register"
          open={this.state.displayModal}        // 是否显示此modal？
          onCancel={this.handleCancel}
          footer={null}                         // 默认为undefined，若没有需要手动给null
          destroyOnClose={true}                 // 关闭时值是否保留
        >
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            preserve={false}
          >
            <Form.Item
              name="email"                      // 用户名
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" /*用户不输入东西，显示此placeholder，以下同 */ />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="first_name"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input placeholder="firstname" />
            </Form.Item>
            <Form.Item
              name="last_name"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input placeholder="lastname" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit"/*必须是submit才会自动调用onFinish */>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  };
}

export default SignupForm;      // 导出