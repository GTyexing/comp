import React, { Component } from 'react';
import { Button, InputNumber } from 'antd';
import { is } from 'immutable';
import PropTypes from 'prop-types';
import ACloze from '../component/ACloze';

class AClozeCon extends Component {
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
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }

    for (const key in nextProps) {
      if (
        thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])
      ) {
        return true;
      }
    }

    for (const key in nextState) {
      if (
        thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])
      ) {
        return true;
      }
    }

    return false;
  }
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
          maxWidth: 700,
          border: '1px solid rgba(0,0,0,.09)',
          borderRadius: 15,
          margin: '10 20',
          backgroundColor: 'white',
        }}
      >
        <ACloze question={question} />
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

export default AClozeCon;
