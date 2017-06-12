import React, { Component } from 'react';
import { Collapse } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HQuestionCard from '../../component/HQuestionCard';
import * as actionHistory from '../../actions/actionHistory';
import styles from '../../style/main.css';

const { Panel } = Collapse;

class History extends Component {
  componentDidMount() {
    this.props.asyncGetHisList();
  }

  getPaper = (key) => {
    this.props.asyncGetHisPaper(key);
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.container}>
          <Collapse
            accordion
            style={{ marginTop: 20 }}
            onChange={this.getPaper}
          >
            {this.props.history.slice(0, 10).map(his => (
              <Panel header={his.paperTitle} key={his.paperId}>
                {' '}
                {this.props.autoPaper.paperQuestions.map(e => (
                  <HQuestionCard key={e.questionId} question={e} />
                ))}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(actionHistory, dispatch);

const mapStateToProps = ({ history, autoPaper }) => ({ history, autoPaper });

export default connect(mapStateToProps, mapDispatchToProps)(History);
