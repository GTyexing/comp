import React, { Component } from 'react';
import {
  Button,
  Slider,
  InputNumber,
  Transfer,
  DatePicker,
  TimePicker,
  Affix,
  notification,
} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import AQuestionCard from '../../component/AQuestionCard';
import AClozeCon from '../../component/AClozeCon';
import * as actionPractice from '../../actions/actionPractice';
import * as actionAuto from '../../actions/actionAuto';
import styles from '../../style/main.css';
import style from '../../style/Auto.css';

const marks = {
  0: '容易',
  25: '较易',
  50: '普通',
  75: '较难',
  100: '困难',
};

class Auto extends Component {
  state = {
    targetKeys: [],
    targetKeys2: [],
    isConfirm: false,
    isShowPaper: false,
    diff: 3,
    number1: 0,
    number2: 0,
    date: 0,
    startTime: 0,
    endTime: 0,
    isChoosed: false,
  };
  componentDidMount() {
    this.props.asyncGetPoint();
  }

  filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1;
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  };
  handleChange2 = (targetKeys2) => {
    this.setState({ targetKeys2 });
  };
  showMore = () => {
    this.setState({ isConfirm: true });
  };
  showPaper = () => {
    this.props.asyncASO({
      difficulty: this.state.diff,
      subjectId: '1',
      pointIds: [...this.state.targetKeys],
      eachTypeCount: [
        { typeId: 1, typeName: '单选题', count: this.state.number1, score: 0 },
        { typeId: 2, typeName: '完形填空', count: this.state.number2, score: 0 },
      ],
    });
    this.setState({ isShowPaper: true });
  };
  handleNumber1Change = (e) => {
    this.setState({ number1: e });
  };
  handleNumber2Change = (e) => {
    this.setState({ number2: e });
  };

  changeDate = (date, dateString) => this.setState({ date: dateString });
  changeEndTime = (time, timeString) => this.setState({ endTime: timeString });
  changeStartTime = (time, timeString) =>
    this.setState({ startTime: timeString });
  makeExam = () => {
    let totalScore = 0;
    const eachScore = [0, 0];
    this.props.autoPaper.paperTypesAndQuestions.forEach((e, i) =>
      e.paperQuestions.forEach((e1) => {
        eachScore[i] += e1.questionScore;
        totalScore += e1.questionScore;
      }),
    );
    const paperTypesAndQuestions = this.props.autoPaper.paperTypesAndQuestions.map(
      e => ({ ...e, score: eachScore[0] }),
    );
    const { date, startTime, endTime } = this.state;
    const sT = new Date(`${date} ${startTime}`);
    const eT = new Date(`${date} ${endTime}`);
    const paper = {
      ...this.props.autoPaper,
      title: '英语考试',
      totalScore,
      paperTypesAndQuestions,
      examName: 'englishExam',
      startTime: sT.getTime(),
      endTime: eT.getTime(),
    };
    this.props.asyncAST(paper);
    notification.open({
      message: '考试安排成功',
      description: `考试将于${this.state.date} ${this.state.startTime} 举行， 考试时间为 2 小时`,
    });
  };

  handleChooseStudent = () => {
    this.setState({ isChoosed: !this.state.isChoosed });
  };

  render() {
    const card = classnames(style.card, style.opa, {
      [style.show]: this.state.isConfirm,
    });
    const container = classnames(style.opa2, {
      [style.dis]: this.state.isShowPaper,
    });
    const paperShow = classnames(style.paper, {
      [style.paperShow]: this.state.isShowPaper,
    });
    let totalScore = 0;
    this.props.autoPaper.paperTypesAndQuestions.forEach(e =>
      e.paperQuestions.forEach((e1) => {
        totalScore += e1.questionScore;
      }),
    );
    const { points } = this.props.app;
    const arr = [];
    const arr2 = [
      { key: 1, title: 'studentA', description: '1' },
      { key: 2, title: 'studentB', description: '2' },
      { key: 3, title: 'studentC', description: '3' },
      { key: 4, title: 'studentD', description: '4' },
      { key: 5, title: 'studentE', description: '5' },
      { key: 6, title: 'studentF', description: '6' },
    ];
    points.map(point =>
      point.childTree.map(p =>
        arr.push({
          key: p.pointId,
          title: p.pointName,
          description: `description of ${p.pointId}`,
        }),
      ),
    );

    return (
      <div className={styles.container} style={{ paddingTop: 10 }}>
        <div className={container}>
          <div className={style.card}>
            <p style={{ fontSize: 24 }}>选择考试科目</p>
            <Button className={style.button} onClick={this.showMore}>英语</Button>
          </div>
          <br />
          <div className={card}>
            <p
              style={{
                fontSize: 24,
                borderBottom: '1px #d9d9d9 solid',
                padding: '10 0',
                marginBottom: 10,
              }}
            >
              具体选项
            </p>
            <p style={{ fontSize: 16 }}>难度</p>
            <div style={{ padding: '10 20' }}>
              <Slider marks={marks} />
            </div>
            <p style={{ fontSize: 16 }}>题型</p>
            <div style={{ padding: '10 20' }}>
              单选题:
              {' '}
              <InputNumber
                min={0}
                defaultValue={0}
                size="large"
                style={{ marginRight: 10 }}
                onChange={this.handleNumber1Change}
              />
              完型填空:
              {' '}
              <InputNumber
                min={0}
                defaultValue={0}
                size="large"
                onChange={this.handleNumber2Change}
              />
            </div>
            <div style={{ display: 'flex' }}>
              <div>
                <p style={{ fontSize: 16 }}>知识点</p>
                <div style={{ padding: '10 20' }}>
                  <Transfer
                    dataSource={arr}
                    filterOption={this.filterOption}
                    targetKeys={this.state.targetKeys}
                    onChange={this.handleChange}
                    render={item => item.title}
                  />
                </div>
              </div>
              <div>
                <p style={{ fontSize: 16 }}>参考人员</p>
                <div style={{ padding: '10 20' }}>
                  <Transfer
                    dataSource={arr2}
                    filterOption={this.filterOption}
                    targetKeys={this.state.targetKeys2}
                    onChange={this.handleChange2}
                    render={item => item.title}
                  />
                </div>
              </div>
            </div>
            <Button
              style={{ borderRadius: '999em' }}
              size="large"
              type="primary"
              onClick={this.showPaper}
            >
              组卷
            </Button>
          </div>
        </div>
        <div className={paperShow}>
          <Affix offsetTop={49}>
            <div
              style={{
                position: 'fixed',
                width: 998,
                backgroundColor: 'white',
                zIndex: 99,
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 2px -2px',
                padding: '10px 20px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: 'xx-large' }}>英语</div>
                <div style={{ fontSize: 14 }}>总分: {totalScore} </div>
              </div>
              <div>
                <div>
                  选择考试日期:
                  {' '}
                  <DatePicker onChange={this.changeDate} />
                  具体时间:
                  {' '}
                  <TimePicker onChange={this.changeStartTime} />
                  {' '}
                  至
                  {' '}
                  <TimePicker onChange={this.changeEndTime} />
                </div>
                <div style={{ float: 'right', marginTop: 10 }}>
                  <Button
                    size="large"
                    style={{ borderRadius: '999em' }}
                    type="primary"
                    onClick={this.makeExam}
                  >
                    确认
                  </Button>
                </div>
              </div>
            </div>
          </Affix>
          <div
            style={{
              marginTop: 100,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {this.props.autoPaper.paperQuestions.map((e, i) => (
              <AQuestionCard
                key={e.questionId}
                question={e}
                i={i}
                changeScore={this.props.changeScore}
                isPreview
              />
            ))}
            {this.props.autoPaper.paperQuestions2.map((e, i) => (
              <AClozeCon
                question={e}
                key={e.questionId}
                i={i}
                changeScore={this.props.changeScore2}
                isPreview
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...actionPractice, ...actionAuto }, dispatch);

const mapStateToProps = ({ app, autoPaper }) => ({ app, autoPaper });

export default connect(mapStateToProps, mapDispatchToProps)(Auto);
