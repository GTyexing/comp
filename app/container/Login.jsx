import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Input, Button, Checkbox } from 'antd';
import style from '../style/Login.css';
import styles from '../style/main.css';

import * as actionLogin from '../actions/actionLogin';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      username: 'student',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.login !== this.state.login) {
      return true;
    }
    return false;
  }

  signUp = () => {
    this.setState({ login: false });
  };

  login = () => {
    this.setState({ login: true });
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
      <div>
        <header className={style.header}>
          <div className={styles.logo}>
            <Link to="/" style={{ color: 'rgba(0,0,0,.50)' }}>卓联智慧组卷</Link>
          </div>
          <div style={{ paddingTop: 24 }}>
            <Button
              type={login ? null : 'primary'}
              size="large"
              className={styles.button}
              style={{ marginRight: 20 }}
              onClick={this.signUp}
            >
              注册
            </Button>
            <Button
              type={login ? 'primary' : null}
              size="large"
              className={styles.button}
              onClick={this.login}
            >
              登录
            </Button>
          </div>
        </header>
        <div className={style.container}>
          {login
            ? <div style={{ width: 500, margin: '0 auto', padding: '0 100px' }}>
              <h1 style={{ margin: 10, textAlign: 'center' }}>登录到智慧组卷</h1>
              <Input
                className={style.input}
                placeholder="邮箱或用户名"
                onChange={this.handleUserNameChange}
              />
              <Input
                className={style.input}
                type="password"
                placeholder="密码"
              />
              <Checkbox
                style={{
                  margin: '10px 10px 10px 10px',
                  float: 'left',
                  color: '#49A9EE',
                }}
              >
                  记住我
                </Checkbox>
              <div
                style={{
                  margin: '10px -10px 10px 10px',
                  float: 'right',
                  color: '#49A9EE',
                }}
              >
                  忘记密码？
                </div>
              <Button
                className={style.button}
                type="primary"
                onClick={this.handleLogin}
              >
                  登录
                </Button>
            </div>
            : <div style={{ width: 500, margin: '0 auto', padding: '0 100px' }}>
              <h1 style={{ margin: 10, textAlign: 'center' }}>注册</h1>
              <Input className={style.input} placeholder="邮箱或用户名" />
              <Input
                className={style.input}
                type="password"
                placeholder="密码"
              />
              <Input
                className={style.input}
                type="password"
                placeholder="确认密码"
              />
              <Button className={style.button} type="primary">注册</Button>
            </div>}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionLogin, dispatch);

export default connect(null, mapDispatchToProps)(Login);
