import React, { Component } from 'react';
import { Button, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import QuestionCard from '../component/QuestionCard';

class AQuestionCard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    question: PropTypes.object,
    isPreview: PropTypes.bool,
    i: PropTypes.number,
    changeScore: PropTypes.func,
  };
  static defaultProps = {
    onChange: null,
    Unsolve: false,
    isPreview: false,
    changeScore: null,
    i: 0,
  };
  state = {
    isAddedInPaper: this.props.isPreview,
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
    const { isAddedInPaper } = this.state;
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
          answers={question.items[0].items}
          check={this.state.check}
          rightAnswer={question.answer}
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
          >{`解析：${question.items[0].solutions}`}</span>

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
            <InputNumber
              defaultValue={question.questionScore || '0'}
              style={{ width: 50 }}
              min={0}
              onChange={this.handleScoreChange}
            />
          </label>
          <Button
            type={this.state.isAddedInPaper ? 'default' : 'primary'}
            style={{ borderRadius: '999em', marginLeft: 10 }}
            onClick={isAddedInPaper ? this.handleRemove : this.handleAdd}
          >
            {isAddedInPaper ? '移除本题' : '加入试卷'}
          </Button>
        </div>
      </div>
    );
  }
}

export default AQuestionCard;
