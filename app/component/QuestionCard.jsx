import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MessageBox from '../component/MessageBox';
import AnswerGroup from '../component/AnswerGroup';

class QuestionCard extends Component {
  static propTypes = {
    rightAnswer: PropTypes.string,
    question: PropTypes.string,
    answers: PropTypes.array,
    check: PropTypes.bool,
    like: PropTypes.bool,
    onChange: PropTypes.func,
    i: PropTypes.number,
  };
  static defaultProps = {
    rightAnswer: 'Z',
    question: 'qurstion',
    answers: [],
    check: false,
    like: false,
    onChange: null,
    i: 0,
  };
  constructor(props) {
    super(props);
    this.state = {
      check: this.props.check,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ check: nextProps.check });
  }

  handleCheckChange = (checked) => {
    this.setState({ check: checked });
  };

  render() {
    const { question, answers, check, rightAnswer, like, i } = this.props;
    return (
      <div style={{ overflow: 'hidden' }}>
        <MessageBox
          question={question}
          check={this.state.check}
          onChange={check ? this.handleCheckChange : null}
          like={like}
          questionId={i}
        />
        {this.props.answers === null
          ? null
          : <AnswerGroup
            answers={answers}
            onChange={this.props.onChange}
            check={this.state.check}
            rightAnswer={rightAnswer}
            questionId={i}
          />}
      </div>
    );
  }
}

export default QuestionCard;
