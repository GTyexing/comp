import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Button } from 'antd';
import styles from '../../style/main.css';
import style from '../../style/Report.css';
import * as actionExam from '../../actions/actionExam';
import * as actionPractice from '../../actions/actionPractice';
import QuestionCard from '../../component/QuestionCard';
import ExamCloze from '../../component/ExamCloze';

class Enhance extends Component {
  state = {
    isShowDetails: false,
    answers: [],
  };
  componentDidMount() {
    this.props.asyncGetEnhance();
  }
  showDetails = () => {
    this.setState({ isShowDetails: !this.state.isShowDetails });
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
    return (
      <div className={styles.container}>
        {this.props.enhance.map(e => (
          <div key={e.examId} style={{ marginTop: 30 }}>
            <div className={style.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>{e.title}</h1>
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
              <div
                style={{
                  display: this.state.isShowDetails ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 700,
                }}
              >
                {e.paperTypesAndQuestions.map(
                  questions =>
                    (questions.typeId === 1
                      ? questions.paperQuestions.map(question => (
                        <QuestionCard
                          question={question.questionContent}
                          i={question.questionId}
                          key={question.questionId}
                          answers={question.items[0].items}
                          check={this.state.check}
                          onChange={this.handleSelectChange}
                        />
                        ))
                      : questions.paperQuestions.map(question => (
                        <ExamCloze
                          question={question}
                          onChange={this.handleSelectChange}
                        />
                        ))),
                )}

              </div>
              <div className={style.coll} onClick={this.showDetails}>
                展开查看考试详情
                {' '}
                {this.state.isShowDetails
                  ? <Icon type="up" />
                  : <Icon type="down" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionPractice, ...actionExam }, dispatch);

const mapStateToProps = ({ enhance }) => ({ enhance });

export default connect(mapStateToProps, mapDispatchToProps)(Enhance);
