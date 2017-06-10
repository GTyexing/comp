import React, { Component } from 'react';
import { Affix, Menu } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionExam from '../actions/actionExam';
import style from '../style/Practice.css';
import styles from '../style/main.css';
import UQuestionCard from '../component/UQuestionCard';
import UnsolveClozeCon from '../component/UnsolveCon';

const SubMenu = Menu.SubMenu;

class Unsolve extends Component {
  state = {
    check: false,
    diff: 0,
    type: 0,
    points: [],
    danxuan: 0,
    wanxing: 0,
    answers: [],
  };

  componentDidMount() {
    this.props.asyncGetUnsolveQuestion();
  }

  check = () => {
    this.setState({ check: !this.state.check });
  };

  handleDiffChange = (e) => {
    this.setState({ diff: e.target.value });
  };

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
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

  mapPoints = () => (
    <div>
      {this.state.danxuan !== 0
        ? <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>单选题</span>
          <span>{this.state.danxuan}</span>
        </p>
        : null}
      {this.state.wanxing !== 0
        ? <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>完型填空</span>
          <span>{this.state.wanxing}</span>
        </p>
        : null}
    </div>
  );
  render() {
    return (
      <div className={styles.backGround}>
        <div
          className={styles.container}
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 2px -2px',
          }}
        >
          <div>
            {this.props.unsolveQuestion.map(
              question =>
                (question.question.questionTypeId === 1
                  ? <UQuestionCard
                    question={question.question}
                    i={question.question.questionId}
                    key={question.question.questionId}
                    check={this.state.check}
                    onChange={this.handleSelectChange}
                    wrongAnswer={question.questionWrongAnswer}
                  />
                  : <UnsolveClozeCon
                    question={question.question}
                    key={question.question.questionId}
                    onChange={this.handleAddToPaper}
                    wrongAnswer={question.questionWrongAnswer}
                  />),
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionExam, dispatch);

const mapStateToProps = ({ unsolveQuestion }) => ({ unsolveQuestion });

export default connect(mapStateToProps, mapDispatchToProps)(Unsolve);
