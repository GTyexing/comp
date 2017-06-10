import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionLike from '../actions/actionLike';
import style from '../style/messageBox.css';

class MessageBox extends Component {
  state = {
    like: this.props.like,
    dislike: !this.props.like,
  };
  handleLike = () => {
    this.props.asyncLike({ id: this.props.questionId, userId: 1 });
    this.setState({ like: true, dislike: false });
  };

  handleUnLike = () => {
    this.props.asyncDisLike({ id: this.props.questionId, userId: 1 });
    this.setState({ like: false, dislike: true });
  };

  changecheck = () => {
    this.props.onChange(!this.props.check);
  };
  render() {
    const tip = classnames(style.tip, { [style.ani]: this.state.like });
    const tip2 = classnames(style.tip2, { [style.ani]: this.state.dislike });
    const messagebox = classnames(style.common, style.messageBoxL);
    return (
      <div>
        <div className={messagebox}>
          <span
            onClick={this.state.like ? this.handleUnLike : this.handleLike}
            style={{
              color: this.state.like ? 'red' : 'darkgrey',
              cursor: 'pointer',
              transition: '.3s',
            }}
            role="button"
          >
            ❤
          </span>
          &nbsp;
          <span
            style={{ wordWrap: 'break-word' }}
            onClick={this.changecheck}
            role="button"
          >
            {this.props.question}
          </span>
        </div>
        <div className={tip}>
          已加入收藏！
        </div>
        <div className={tip2}>
          已移除收藏！
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionLike, dispatch);

export default connect(null, mapDispatchToProps)(MessageBox);
