import React, { Component } from 'react';
import { Button, Affix } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionPractice from '../actions/actionPractice';
import * as actionExam from '../actions/actionExam';
import CountDown from '../component/CountDown';
import style from '../style/OnlineTest.css';
import styles from '../style/main.css';
import QuestionCard from '../component/QuestionCard';
import ExamCloze from '../component/ExamCloze';

class OnlineTest extends Component {
  state = {
    isConfirm: false,
    isDone: true,
    isStart: false,
    isSubmit: false,
    isCheck: false,
    answers: [],
  };

  componentDidMount() {
    this.props.asyncGetExam();
  }
  Start = () => {
    this.setState({ isStart: true });
  };
  makepaper = () => {
    this.setState({ isConfirm: !this.state.isConfirm });
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
  handleSubmit = () => {
    const answerJson = this.state.answers
      .map(answer => `${answer.questionId}|${answer.questionAnswer}`)
      .join(',');
    this.props.asyncSubmitAnswer({
      studentId: 1,
      paperId: this.props.autoPaper.paperId,
      answerJson,
    });
    this.setState({ isSubmit: true });
  };
  handleExamine = () => {
    this.setState({ isCheck: !this.state.isCheck });
  };
  render() {
    const div2 = classnames(style.chooseTable, style.Top, {
      [style.opa]: this.state.isConfirm,
    });
    const mainContent = classnames(
      style.chooseTable,
      style.Top2,
      { [style.opa]: this.state.isStart },
      { [style.Hide]: this.state.isSubmit },
    );
    return (
      <div className={styles.backGround}>
        <div className={styles.container}>
          <div className={style.chooseTable}>
            <p>选择考试科目</p>
            <Button className={style.button} onClick={this.makepaper}>
              英语
            </Button>
          </div>
          <Affix offsetTop={-81}>
            <div className={div2}>
              {this.state.isConfirm
                ? this.state.isDone
                    ? this.state.isStart
                        ? <div className={style.startTest}>
                          <CountDown
                            timeLeft={120}
                            isSubmit={this.state.isSubmit}
                          />
                          <div>
                            <Button
                              style={{
                                marginRight: 10,
                                background: '#0AE370',
                                border: '1px solid #0AE370',
                              }}
                              className={style.dangerButton}
                              size="large"
                              type="primary"
                              onClick={this.handleExamine}
                            >
                              {this.state.isCheck ? '还原' : '检查'}
                            </Button>
                            <Button
                              className={style.dangerButton}
                              type="danger"
                              size="large"
                              disabled={!!this.state.isSubmit}
                              onClick={this.handleSubmit}
                            >
                                交卷
                              </Button>
                          </div>
                        </div>
                        : <div style={{ display: 'flex' }}>
                            生成完毕
                            <Button
                              className={style.button}
                              size="large"
                              onClick={this.Start}
                            >
                              开始考试
                            </Button>
                        </div>
                    : '试卷生成中'
                : ''}
            </div>
          </Affix>
          <div className={mainContent}>
            {this.props.autoPaper.paperQuestions.map(question => (
              <QuestionCard
                question={question.questionContent}
                i={question.questionId}
                key={question.questionId}
                answers={question.items[0].items}
                check={this.state.isCheck}
                onChange={this.handleSelectChange}
              />
            ))}
            {this.props.autoPaper.paperQuestions2.map(question => (
              <ExamCloze
                question={question}
                onChange={this.handleSelectChange}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionPractice, ...actionExam }, dispatch);

const mapStateToProps = ({ app, autoPaper }) => ({ app, autoPaper });

export default connect(mapStateToProps, mapDispatchToProps)(OnlineTest);
