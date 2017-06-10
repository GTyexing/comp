import React, { Component } from 'react';
import { Button, Affix, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionPractice from '../actions/actionPractice';
import style from '../style/Practice.css';
import styles from '../style/main.css';
import FQuestionCard from '../component/FQuestionCard';

const SubMenu = Menu.SubMenu;

class Favorites extends Component {
  state = {
    check: false,
  };

  componentDidMount() {
    this.props.asyncGetPoint();
    this.props.asyncGetQuestion();
  }

  check = () => {
    this.setState({ check: !this.state.check });
  };

  render() {
    const { points, questions } = this.props.app;
    return (
      <div className={styles.backGround}>
        <div
          className={styles.container}
          style={{
            backgroundColor: 'white',
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 2px -2px',
          }}
        >
          <div className={style.conTent}>
            <div>
              {questions.map(question => (
                <FQuestionCard
                  key={question.questionId}
                  question={question}
                  like
                />
              ))}
            </div>
          </div>
          <div className={style.sidebar}>
            <Affix offsetTop={87}>
              <Menu
                mode="inline"
                style={{
                  width: 232,
                }}
                defaultOpenKeys={['yw']}
              >
                <SubMenu key="yw" title="英语">
                  {points.map(point => (
                    <SubMenu key={point.pointId} title={point.pointName}>
                      {point.childTree.map(P => (
                        <Menu.Item
                          key={P.pointId}
                          style={{ backGroundColor: 'rgba(255,255,255,0)' }}
                        >
                          {P.pointName}
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ))}
                </SubMenu>
              </Menu>
            </Affix>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionPractice, dispatch);

const mapStateToProps = ({ app }) => ({ app });

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
