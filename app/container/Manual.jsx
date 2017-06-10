import React, { Component } from 'react';
import {
  Button,
  Affix,
  Menu,
  Radio,
  Popover,
  DatePicker,
  TimePicker,
  notification,
} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { is } from 'immutable';
import AQuestionCard from '../component/AQuestionCard';
import * as actionPractice from '../actions/actionPractice';
import * as actionManual from '../actions/actionManual';
import * as actionAuto from '../actions/actionAuto';
import style from '../style/Practice.css';
import styles from '../style/main.css';
import stylea from '../style/Auto.css';
import PQuestionCard from '../component/PQuestionCard';
import PClozeCon from '../component/PClozeCon';
import AClozeCon from '../component/AClozeCon';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SubMenu = Menu.SubMenu;

class Manual extends Component {
  state = {
    check: false,
    diff: 0,
    type: 0,
    points: [],
    danxuan: 0,
    wanxing: 0,
    key: 0,
    date: null,
    startTime: null,
    endTime: null,
    isActive: false,
  };

  componentDidMount() {
    this.props.asyncGetPoint();
    this.props.asyncGetQuestion();
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};
    const thisState = this.state || {};
    if (
      Object.keys(thisProps).length !== Object.keys(nextProps).length ||
      Object.keys(thisState).length !== Object.keys(nextState).length
    ) {
      return true;
    }

    for (const key in nextProps) {
      if (
        thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])
      ) {
        return true;
      }
    }

    for (const key in nextState) {
      if (
        thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])
      ) {
        return true;
      }
    }

    return false;
  }

  check = () => {
    this.setState({ check: !this.state.check });
  };

  handleAddToPaper = (info) => {
    const { points, danxuan, wanxing } = this.state;
    switch (info.action) {
      case 'add':
        this.setState({
          points: [...points, { id: info.id, score: 0, type: info.type }],
          danxuan: info.type === 1 ? danxuan + 1 : danxuan,
          wanxing: info.type === 2 ? wanxing + 1 : wanxing,
        });
        break;
      case 'remove':
        this.setState({
          points: points.filter(point => point.id !== info.id),
          danxuan: info.type === 1 ? danxuan - 1 : danxuan,
          wanxing: info.type === 2 ? wanxing - 1 : wanxing,
        });
        break;
      case 'score': {
        const pos = points.map(e => e.id).indexOf(info.id);
        if (pos !== -1) {
          this.setState({
            points: [
              ...points.slice(0, pos),
              { ...points[pos], score: parseInt(info.score) },
              ...points.slice(pos + 1),
            ],
          });
        }
        break;
      }
      default:
        break;
    }
  };

  handleDiffChange = (e) => {
    const { key, type } = this.state;
    this.props.asyncSQO(1, key, e.target.value, type);
    this.setState({ diff: e.target.value });
  };

  handleTypeChange = (e) => {
    const { key, diff } = this.state;
    this.props.asyncSQO(1, key, diff, e.target.value);
    this.setState({ type: e.target.value });
  };
  handlePointChange = (e) => {
    const { diff, type } = this.state;
    this.props.asyncSQO(1, e.key, diff, type);
    this.setState({ key: e.key });
  };
  handleMakePaper = () => {
    let totalScore = 0;
    let type1Score = 0;
    let type2Score = 0;
    this.state.points.forEach((e) => {
      e.type === 1 ? (type1Score += e.score) : (type2Score += e.score);
      totalScore += e.score;
    });

    const info = {
      paper: {
        title: '英语试卷',
        totalScore,
        subjectId: 1,
        userId: 1,

        paperTypesAndQuestions: [
          {
            typeId: 1,
            score: type1Score,
            paperQuestions: this.state.points
              .filter(e => e.type === 1)
              .map(point => ({
                questionId: point.id,
                questionScore: point.score,
              })),
          },
          {
            typeId: 2,
            score: type2Score,
            paperQuestions: this.state.points
              .filter(e => e.type === 2)
              .map(point => ({
                questionId: point.id,
                questionScore: point.score,
              })),
          },
        ],
      },
    };
    this.props.asyncMMP(info.paper);
    this.setState({ isActive: true });
  };

  mapPoints = () => (
    <div>
      {this.state.danxuan !== 0
        ? <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>单选题</span>
          <span>{this.state.danxuan}</span>
        </p>
        : null}
      {this.state.wanxing !== 0
        ? <p style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>完型填空</span>
          <span>{this.state.wanxing}</span>
        </p>
        : null}
    </div>
  );

  changeDate = (date, dateString) => this.setState({ date: dateString });
  changeEndTime = (time, timeString) => this.setState({ endTime: timeString });
  changeStartTime = (time, timeString) =>
    this.setState({ startTime: timeString });
  handleMakeExam = () => {
    const { paperId, title } = this.props.autoPaper;
    const { date, startTime, endTime } = this.state;
    const sT = new Date(`${date} ${startTime}`);
    const eT = new Date(`${date} ${endTime}`);
    this.props.asyncMakeExam({
      paperId,
      examName: 'englishExam',
      startTime: sT.getTime(),
      endTime: eT.getTime(),
    });
    notification.open({
      message: '考试安排成功',
      description: `考试将于${this.state.date} ${this.state.startTime} 举行， 考试时间为 2 小时`,
    });
  };

  render() {
    const { points, questions } = this.props.app;
    const paperShow = classnames(stylea.paper, {
      [stylea.paperShow]: this.state.isActive,
    });
    const container = classnames(styles.container, {
      [stylea.dis]: this.state.isActive,
    });
    let totalScore = 0;
    this.props.autoPaper.paperTypesAndQuestions.forEach(e =>
      e.paperQuestions.forEach((e1) => {
        totalScore += e1.questionScore;
      }),
    );
    return (
      <div className={styles.backGround}>
        <div
          className={container}
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 2px -2px',
            height: 5000,
          }}
        >
          <div className={style.conTent}>
            <Affix offsetTop={49}>
              <div className={style.info}>
                <span>
                  {' '}题型选择{' '}
                  <RadioGroup onChange={this.handleTypeChange}>
                    <RadioButton value="1">单择题</RadioButton>
                    <RadioButton value="2">完形填空</RadioButton>
                  </RadioGroup>
                </span>
                <span>
                  {' '}难度选择{' '}
                  <RadioGroup onChange={this.handleDiffChange}>
                    <RadioButton value="1">容易</RadioButton>
                    <RadioButton value="2">较易</RadioButton>
                    <RadioButton value="3">普通</RadioButton>
                    <RadioButton value="4">较难</RadioButton>
                    <RadioButton value="5">困难</RadioButton>
                  </RadioGroup>
                </span>
                <Popover
                  content={this.mapPoints()}
                  title="已选试题"
                  placement="left"
                >
                  <Button type="primary" onClick={this.handleMakePaper}>
                    组卷
                  </Button>
                </Popover>
              </div>
            </Affix>
            <div>
              {questions.map(
                question =>
                  (question.questionTypeId === 1
                    ? <PQuestionCard
                      key={question.questionId}
                      question={question}
                      onChange={this.handleAddToPaper}
                    />
                    : <PClozeCon
                      question={question}
                      key={question.questionId}
                      onChange={this.handleAddToPaper}
                    />),
              )}
            </div>
          </div>
          <div className={style.sidebar}>
            <Affix offsetTop={49}>
              <Menu
                mode="inline"
                style={{
                  width: 232,
                }}
                onClick={this.handlePointChange}
                defaultOpenKeys={['yw']}
              >
                <SubMenu key="yw" title="英语">
                  {points.map(point => (
                    <SubMenu key={point.pointId} title={point.pointName}>
                      {point.childTree.map(P => (
                        <Menu.Item
                          key={P.pointId}
                          style={{ backGroundColor: 'rgba(255,255,255,0)' }}
                        >
                          {P.pointName}
                        </Menu.Item>
                      ))}
                    </SubMenu>
                  ))}
                </SubMenu>
              </Menu>
            </Affix>
          </div>
        </div>
        <div className={paperShow} style={{ margin: '20 auto' }}>
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
                <div style={{ fontSize: 'xx-large' }}>
                  {this.props.autoPaper.title}
                </div>
                <div style={{ fontSize: 14 }}>
                  总分: {totalScore}
                </div>
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
                    onClick={this.handleMakeExam}
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
  bindActionCreators(
    { ...actionPractice, ...actionManual, ...actionAuto },
    dispatch,
  );

const mapStateToProps = ({ app, autoPaper }) => ({ app, autoPaper });

export default connect(mapStateToProps, mapDispatchToProps)(Manual);
