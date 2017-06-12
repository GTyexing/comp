import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Button, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import style from '../style/Login.css';
import styles from '../style/main.css';

import * as actionLogin from '../actions/actionLogin';

class Login extends Component {
  static propTypes = {
    asyncLogin: PropTypes.func.isRequired,
  };

  state = {
    login: true,
    username: 'student',
  };

  loginSignUpSwitch = () => {
    this.setState({ login: !this.state.login });
  };

  handleUserNameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleLogin = () => {
    this.props.asyncLogin(this.state.username);
  };

  render() {
    const { login } = this.state;
    return (
      <div className={style.container}>
        <header className={style.header}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 10px' }}>
            <div className={styles.logo} />
            <Button
              style={{
                float: 'right',
                margin: '24px 0',
              }}
              type="primary"
              size="large"
              className={styles.button}
              onClick={this.loginSignUpSwitch}
            >
              {login ? '注册' : '登录'}
            </Button>
          </div>
        </header>
        <div>
          <div style={{ width: 300, margin: '50px auto' }}>
            <h1 style={{ margin: 10, textAlign: 'center' }}>
              {login ? '登录到智慧组卷' : '注册'}
            </h1>
            <Input
              className={style.input}
              placeholder="邮箱或用户名"
              onChange={this.handleUserNameChange}
            />
            <Input className={style.input} type="password" placeholder="密码" />
            {login
              ? <div>
                <Checkbox
                  style={{
                    float: 'left',
                    color: '#49A9EE',
                  }}
                >
                    记住我
                  </Checkbox>
                <div
                  style={{
                    float: 'right',
                    color: '#49A9EE',
                  }}
                >
                    忘记密码？
                  </div>
              </div>
              : <Input
                className={style.input}
                type="password"
                placeholder="确认密码"
              />}
            <Button
              className={style.button}
              type="primary"
              onClick={this.handleLogin}
            >
              {login ? '登录' : '注册'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionLogin, dispatch);

export default connect(null, mapDispatchToProps)(Login);
