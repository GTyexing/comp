import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import QuestionCard from '../component/QuestionCard';

class FQuestionCard extends Component {
  static propTypes = {
    question: PropTypes.object,
    like: PropTypes.bool,
  };
  state = {
    isAddedInPaper: false,
  };
  handleAdd = () => {
    this.setState({ isAddedInPaper: true });
  };
  handleRemove = () => {
    this.setState({ isAddedInPaper: false });
  };
  render() {
    const { question, like } = this.props;
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
          like={like}
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
          <Button
            type={this.state.isAddedInPaper ? 'default' : 'primary'}
            style={{ borderRadius: '999em', marginLeft: 10 }}
            onClick={
              this.state.isAddedInPaper ? this.handleRemove : this.handleAdd
            }
          >
            {this.state.isAddedInPaper ? '撤销操作' : '不再收藏'}
          </Button>
        </div>
      </div>
    );
  }
}

export default FQuestionCard;
