import React, { Component } from 'react';
import { Button, Affix, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionPractice from '../../actions/actionPractice';
import style from '../../style/Practice.css';
import styles from '../../style/main.css';
import QuestionCard from '../../component/QuestionCard';
import PracticeCloze from '../../component/PracticeCloze';

const SubMenu = Menu.SubMenu;

class Practice extends Component {
  state = {
    check: false,
    answers: [],
  };

  componentDidMount() {
    this.props.asyncGetPoint();
    this.props.asyncGetQuestion();
  }

  check = () => {
    this.setState({ check: !this.state.check });
  };

  handleSelectChange = (info) => {
    const index = this.state.answers.findIndex(
      answer => answer.questionId === info.questionId,
    );
    return index === -1
      ? this.setState({ answers: [...this.state.answers, info] })
      : this.setState({
        answers: [
          ...this.state.answers.slice(0, index),
          info,
          ...this.state.answers.slice(index + 1),
        ],
      });
  };

  submitAnswer = () => {
    this.props.asyncSubmitAnswer({
      studentId: 1,
      paperId: 1,
      answerJson: this.state.answers,
    });
    this.props.asyncGetQuestion();
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
            <Affix offsetTop={49}>
              <div className={style.info}>
                <div />
                <div>
                  <Button
                    style={{
                      marginRight: 10,
                      background: '#0AE370',
                      border: '1px solid #0AE370',
                    }}
                    className={styles.button}
                    type="primary"
                    onClick={this.check}
                  >
                    {this.state.check ? '还原' : '检查'}
                  </Button>
                  <Button
                    className={styles.button}
                    type="primary"
                    onClick={this.submitAnswer}
                  >
                    提交
                  </Button>
                </div>
              </div>
            </Affix>
            <div>
              {questions.map(
                question =>
                  (question.questionTypeId === 1
                    ? <QuestionCard
                      question={question.questionContent}
                      i={question.questionId}
                      key={question.questionId}
                      answers={question.optionSolutions[0].items}
                      check={this.state.check}
                      onChange={this.handleSelectChange}
                    />
                    : <PracticeCloze
                      question={question}
                      onChange={this.handleSelectChange}
                    />),
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
