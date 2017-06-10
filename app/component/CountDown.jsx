import React, { Component } from 'react';
import style from '../style/OnlineTest.css';

class CountDown extends Component {
  state = {
    timeLeft: this.props.timeLeft,
  };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        timeLeft: this.state.timeLeft - 1,
      });
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        {this.props.isSubmit
          ? <span className={style.startTest}>考试结束</span>
          : <div>
            <span style={{ fontSize: 'large' }}>剩余&nbsp;&nbsp;</span>
            <span style={{ fontSize: 'xx-large', fontWeight: 700 }}>
              {this.state.timeLeft}m
              </span>
          </div>}
      </div>
    );
  }
}

export default CountDown;
