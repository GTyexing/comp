import React, { Component } from 'react';
import { Icon } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionExam from '../actions/actionExam';
import styles from '../style/main.css';
import style from '../style/Report.css';

const data = [
  { name: '考试 1', ranking: 50, averageScore: 20 },
  { name: '考试 2', ranking: 30, averageScore: 40 },
  { name: '考试 3', ranking: 40, averageScore: 30 },
  { name: '考试 4', ranking: 35, averageScore: 60 },
  { name: '考试 5', ranking: 20, averageScore: 80 },
  { name: '考试 6', ranking: 10, averageScore: 90 },
  { name: '考试 7', ranking: 1, averageScore: 100 },
];

class Info extends Component {
  state = {
    isShowDetails: false,
  };
  componentDidMount() {
    this.props.asyncGetExamForteacher();
  }
  showDetails = (e) => {
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
              近期考试情况一览
            </div>
            <LineChart
              width={600}
              height={300}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="averageScore" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
        {this.props.teacher.map((e, i) => (
          <div key={i} style={{ marginTop: 30, transition: 'all .3s' }}>
            <div className={style.card}>
              <h1>{e.examReports[0].examPaper.title}</h1>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '40%',
                }}
              >
                <h3>总分 {e.examReports[0].totalScore}</h3>
                <h3>平均分 {e.examReports[0].avgScore}</h3>
              </div>
              <div
                style={{
                  display: this.state.isShowDetails ? 'flex' : 'none',
                  flexDirection: 'column',
                  marginTop: 10,
                }}
              >
                {e.examReports.map(e1 => (
                  <div>
                    {e1.student.studentName}{' '}{' '}{e1.studentScore}
                  </div>
                ))}
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

const mapStateToProps = ({ teacher, examList }) => ({ teacher, examList });

export default connect(mapStateToProps, mapDispatchToProps)(Info);
