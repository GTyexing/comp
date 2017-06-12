import React, { Component } from 'react';
import { Select, Input, Icon } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionExam from '../../actions/actionExam';
import styles from '../../style/main.css';
import style from '../../style/Report.css';
import QuestionCard from '../../component/QuestionCard';
import ExamCloze from '../../component/ExamCloze';

const data = [
  { name: '考试 1', ranking: 50, result: 20 },
  { name: '考试 2', ranking: 30, result: 40 },
  { name: '考试 3', ranking: 40, result: 30 },
  { name: '考试 4', ranking: 35, result: 60 },
  { name: '考试 5', ranking: 20, result: 80 },
  { name: '考试 6', ranking: 10, result: 90 },
  { name: '考试 7', ranking: 1, result: 100 },
];

class Report extends Component {
  state = {
    isShowDetails: false,
  };
  componentDidMount() {
    this.props.asyncGetExamList();
  }
  showDetails = () => {
    this.setState({ isShowDetails: !this.state.isShowDetails });
  };

  render() {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              近期考试排名一览
            </div>
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis reversed />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="ranking" stroke="#8884d8" />
            </LineChart>
          </div>
          <div>
            <div
              style={{
                fontSize: 16,
                textAlign: 'center',
              }}
            >
              近期考试分数一览
            </div>
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis reverse />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="result" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        {this.props.examList.map(e => (
          <div key={e.examId} style={{ marginTop: 30 }}>
            <div className={style.card}>
              <h1>{e.examPaper.title}</h1>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '40%',
                }}
              >
                <h3>总分 {e.totalScore}</h3>
                <h3>分数 {e.studentScore}</h3>
                <h3>平均分 {e.avgScore}</h3>
                <h3>排名 1</h3>
              </div>
              <div
                style={{
                  display: this.state.isShowDetails ? 'flex' : 'none',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: 700,
                }}
              >
                {e.examPaper.paperTypesAndQuestions.map(
                  questions =>
                    (questions.typeId === 1
                      ? questions.paperQuestions.map(question => (
                        <QuestionCard
                          question={question.questionContent}
                          i={question.questionId}
                          key={question.questionId}
                          answers={question.items[0].items}
                          check={this.state.check}
                          onChange={this.handleSelectChange}
                        />
                        ))
                      : questions.paperQuestions.map(question => (
                        <ExamCloze
                          question={question}
                          onChange={this.handleSelectChange}
                        />
                        ))),
                )}

              </div>
              <div className={style.coll} onClick={this.showDetails}>
                展开查看考试详情
                {' '}
                {this.state.isShowDetails
                  ? <Icon type="up" />
                  : <Icon type="down" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(actionExam, dispatch);

const mapStateToProps = ({ examList }) => ({ examList });

export default connect(mapStateToProps, mapDispatchToProps)(Report);
