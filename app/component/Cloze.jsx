import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionLike from '../actions/actionLike';
import PropTypes from 'prop-types';
import styles from '../style/messageBox.css';
import style from '../style/Cloze.css';
import ClozePopover from '../component/ClozePopover';

class Cloze extends Component {
  static propTypes = {
    question: PropTypes.object,
    check: PropTypes.bool,
    like: PropTypes.bool,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    question: { questionContent: '', items: [] },
    check: false,
    like: false,
    onChange: null,
  };
  state = {
    like: this.props.like,
    dislike: !this.props.like,
  };
  handleLike = () => {
    this.props.asyncLike({ id: this.props.question.questionId, userId: 1 });
    this.setState({ like: true, dislike: false });
  };

  handleUnLike = () => {
    this.props.asyncDisLike({ id: this.props.question.questionId, userId: 1 });
    this.setState({ like: false, dislike: true });
  };

  changecheck = () => {
    // this.props.onChange(!this.props.check);
  };
  render() {
    const tip = classnames(styles.tip, { [styles.ani]: this.state.like });
    const tip2 = classnames(styles.tip2, { [styles.ani]: this.state.dislike });
    const messagebox = classnames(styles.common, styles.messageBoxL);
    const a = this.props.question.questionContent
      .split('_')
      .filter(e => e !== '');
    return (
      <div>
        <div className={messagebox} style={{ maxWidth: '70%' }}>
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
            style={{
              wordWrap: 'break-word',
              fontSize: 16,
              lineHeight: '200%',
            }}
            onClick={this.changecheck}
          >
            {a.map(
              e =>
                (e.length <= 2 && e !== '.' && e !== '?'
                  ? <ClozePopover
                    className={style.selectArea}
                    answers={this.props.question.items[parseInt(e) - 1]}
                    text={e}
                    key={e}
                  />
                  : e),
            )}
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

export default connect(null, mapDispatchToProps)(Cloze);
