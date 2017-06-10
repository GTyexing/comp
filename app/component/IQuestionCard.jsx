import React, { Component } from 'react';
import { Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import QuestionCard from '../component/QuestionCard';

class IQuestionCard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    question: PropTypes.object,
    i: PropTypes.number,
    changeScore: PropTypes.func,
  };
  static defaultProps = {
    onChange: null,
    Unsolve: false,
    changeScore: null,
    i: 0,
  };
  state = {
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
  handleScoreChange = (score) => {
    this.props.changeScore({ score, i: this.props.i });
  };
  render() {
    const { question } = this.props;
    return (
      <div
        style={{
          boxShadow: '0 1px 4px rgba(0,0,0,.04)',
          width: 700,
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
      </div>
    );
  }
}

export default IQuestionCard;
