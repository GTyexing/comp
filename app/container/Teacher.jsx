import React from 'react';
import { Menu, Affix, Icon } from 'antd';
import { Link } from 'react-router';
import style from '../style/Student.css';
import styles from '../style/main.css';

class Teacher extends React.Component {
  render() {
    return (
      <div>
        <header style={{ backgroundColor: 'white' }}>
          <div className={style.header1}>
            <div className={styles.logo} />
            <div className={style.userarea}>
              <div
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: '50%',
                  textAlign: 'center',
                  fontSize: '300%',
                }}
              >
                <Icon type="smile-o" />
              </div>
              <div style={{ padding: '5 10', fontSize: 16 }}>teacher</div>
            </div>
          </div>
          <Affix>
            <div
              style={{
                boxShadow: '0 2px 2px -2px rgba(0,0,0,.15)',
                backgroundColor: 'white',
              }}
            >
              <Menu
                mode="horizontal"
                defaultSelectedKeys={['1']}
                className={style.header2}
              >
                <Menu.Item key="1">
                  <Link to="/teacher" className={style.linktext}>自动组卷</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/teacher/Manual" className={style.linktext}>
                    手动组卷
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/teacher/Favorites" className={style.linktext}>
                    收藏夹
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/teacher/history" className={style.linktext}>
                    历史组卷
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to="/teacher/Info" className={style.linktext}>
                    考试报告
                  </Link>
                </Menu.Item>
              </Menu>
            </div>
          </Affix>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default Teacher;
