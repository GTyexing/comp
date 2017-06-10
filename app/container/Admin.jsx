import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionAuto from '../actions/actionAuto';
import Cloze from '../component/Cloze';
import ClozePopover from '../component/ClozePopover';

class Admin extends React.Component {
  componentDidMount() {
    const pointIds = [];
    for (let i = 0; i < 67; i += 1) {
      pointIds.push(i);
    }
    this.props.asyncASO({
      difficulty: 3,
      subjectId: '1',
      pointIds,
      eachTypeCount: [
        { typeId: 1, typeName: '单选题', count: 0, score: 0 },
        { typeId: 2, typeName: '完形填空', count: 5, score: 0 },
      ],
    });
  }

  render() {
    return <Cloze question={this.props.autoPaper.paperQuestions2[0]} />;
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionAuto, dispatch);

const mapStateToProps = ({ autoPaper }) => ({ autoPaper });

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
