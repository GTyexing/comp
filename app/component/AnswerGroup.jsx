import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from '../style/messageBox.css';

class AnswerGroup extends Component {
  static propTypes = {
    answers: PropTypes.array,
    rightAnswer: PropTypes.string,
    check: PropTypes.bool,
    questionId: PropTypes.number,
  };

  static defaultProps = {
    rightAnswer: 'Z',
    questionId: 0,
  };

  state = {
    choosed: '',
  };

  choose = (e) => {
    this.props.onChange({
      questionId: this.props.questionId,
      questionAnswer: e.target.value[0],
    });
    this.setState({ choosed: e.target.value });
  };

  render() {
    const { answers, check, rightAnswer } = this.props;
    const { choosed } = this.state;
    const messagebox = classnames(style.common, style.messageBoxR);
    const choose = classnames(style.common, style.messageC);
    return (
      <form onChange={this.choose}>
        {check
          ? <div className={style.container}>
            <label htmlFor={choosed} className={choose}>
              {choosed === '' ? '还没做哟！' : choosed}
            </label>
          </div>
          : answers.map((answer, i) => (
            <div key={i} className={style.container}>
              <input
                className={style.input}
                type="radio"
                value={answer}
                name="title"
                checked={choosed === answer}
                disabled={rightAnswer !== 'Z'}
              />
              <label
                htmlFor={answer}
                className={rightAnswer === answer[0] ? choose : messagebox}
              >
                <p style={{ wordWrap: 'break-word' }}>{answer}</p>
              </label>
            </div>
            ))}
      </form>
    );
  }
}

export default AnswerGroup;
