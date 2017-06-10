import React, { Component } from 'react';
import { Popover } from 'antd';
import PropTypes from 'prop-types';
import style from '../style/Cloze.css';
import styles from '../style/messageBox.css';

class ClozePopover extends Component {
  static propTypes = {
    text: PropTypes.string,
    answers: PropTypes.object,
    rightAnswer: PropTypes.string,
  };
  static defaultProps = {
    text: '0',
    answers: { items: [], solution: 'solutions' },
    rightAnswer: 'Z',
  };
  state = {
    choosed: '',
  };

  choose = (e) => {
    this.props.onChange({ i: parseInt(this.props.i), value: e.target.value });
    this.setState({ choosed: e.target.value });
  };
  render() {
    let ra;
    const content = (
      <form onChange={this.choose}>
        {this.props.answers.items.map((item) => {
          if (this.props.rightAnswer === item[0]) {
            ra = item.slice(2);
          }
          return (
            <div key={item[0]}>
              <input
                className={styles.input}
                value={item}
                type="radio"
                checked={this.state.choosed[0] === item[0]}
                disabled={this.props.rightAnswer !== 'Z'}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </form>
    );
    return (
      <Popover
        overlayStyle={{
          fontSize: 16,
        }}
        content={content}
        trigger="focus"
      >
        <button
          className={
            this.state.choosed === '' && this.props.rightAnswer === 'Z'
              ? style.selectArea
              : style.selectedArea
          }
        >
          &nbsp;&nbsp;
          {this.props.rightAnswer === 'Z'
            ? this.state.choosed === ''
                ? this.props.text
                : this.state.choosed.slice(2)
            : ra}
          &nbsp;&nbsp;
        </button>
      </Popover>
    );
  }
}

export default ClozePopover;
