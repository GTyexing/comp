import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import * as actionLike from '../actions/actionLike';
import PropTypes from 'prop-types';
import styles from '../style/messageBox.css';
import style from '../style/Cloze.css';
import ClozePopover from '../component/ClozePopover';

class PCloze extends Component {
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
    value: [],
  };
  handleLike = () => {
    this.props.asyncLike({ id: this.props.question.questionId, userId: 1 });
    this.setState({ like: true, dislike: false });
  };

  handleUnLike = () => {
    this.props.asyncDisLike({ id: this.props.question.questionId, userId: 1 });
    this.setState({ like: false, dislike: true });
  };
  handleChange = (info) => {
    const answers = [...this.state, info]
      .sort((a, b) => (a.i > b.i ? 1 : -1))
      .map(a => a.value)
      .join('');
    this.props.onChange({
      questionId: this.props.question.questionId,
      questionAnswer: answers,
    });
    this.setState({ value: [...this.state.value, info] });
  };
  render() {
    const messagebox = classnames(styles.common, styles.messageBoxL);
    const a = this.props.question.questionContent
      .split('_')
      .filter(e => e !== '');
    const b = this.props.question.questionAnswer
      .split(' ')
      .filter(e => e !== '')
      .join('')
      .split('-')
      .filter(e => e !== '')
      .join('')
      .replace(/\d+/g, '');
    return (
      <div>
        <div className={messagebox} style={{ maxWidth: '100%' }}>
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
          >
            {a.map(
              (e, i) =>
                (e.length <= 2 && e !== '.' && e !== '?'
                  ? <ClozePopover
                    className={style.selectArea}
                    answers={
                        this.props.question.optionSolutions[parseInt(e) - 1]
                      }
                    rightAnswer={b[parseInt(e) - 1]}
                    text={e}
                    key={i}
                    i={parseInt(e)}
                    onChange={this.handleChange}
                  />
                  : e),
            )}
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionLike, dispatch);

export default connect(null, mapDispatchToProps)(PCloze);
