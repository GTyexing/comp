import React, { Component } from 'react';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import QuestionCard from '../component/QuestionCard';

class PQuestionCard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    question: PropTypes.object,
  };
  static defaultProps = {
    onChange: null,
    Unsolve: false,
  };
  state = {
    isAddedInPaper: false,
    score: 0,
  };
  handleAdd = () => {
    const { questionId, questionTypeId } = this.props.question;
    this.props.onChange({
      id: questionId,
      type: questionTypeId,
      action: 'add',
    });
    this.setState({ isAddedInPaper: true });
  };
  handleRemove = () => {
    const { questionId, questionTypeId } = this.props.question;
    this.props.onChange({
      id: questionId,
      type: questionTypeId,
      action: 'remove',
    });
    this.setState({ isAddedInPaper: false });
  };
  handleScoreChange = (e) => {
    const { questionId, questionTypeId } = this.props.question;
    this.props.onChange({
      id: questionId,
      score: e.target.value,
      type: questionTypeId,
      action: 'score',
    });
    this.setState({ score: e.target.value });
  };
  render() {
    const { question } = this.props;
    return (
      <div
        style={{
          boxShadow: '0 1px 4px rgba(0,0,0,.04)',
          maxWidth: 700,
          border: '1px solid rgba(0,0,0,.09)',
          borderRadius: 15,
          margin: '10 20',
          backgroundColor: 'white',
        }}
      >
        <QuestionCard
          question={question.questionContent}
          answers={question.optionSolutions[0].items}
          check={this.state.check}
          rightAnswer={question.questionAnswer}
        />
        <div
          style={{
            borderTop: '1px rgba(128, 128, 128, 0.36) solid',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{ fontSize: '14px' }}
          >{`解析：${question.optionSolutions[0].solutions}`}</span>

        </div>
        <div
          style={{
            borderTop: '1px rgba(128, 128, 128, 0.36) solid',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <label htmlFor="score">
            分值
            {' '}
            <Input
              defaultValue="0"
              style={{ width: 50 }}
              onChange={this.handleScoreChange}
            />
          </label>
          <Button
            type={this.state.isAddedInPaper ? 'default' : 'primary'}
            style={{ borderRadius: '999em', marginLeft: 10 }}
            onClick={
              this.state.isAddedInPaper ? this.handleRemove : this.handleAdd
            }
          >
            {this.state.isAddedInPaper ? '移除本题' : '加入试卷'}
          </Button>
        </div>
      </div>
    );
  }
}

export default PQuestionCard;
