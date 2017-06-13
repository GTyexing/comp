import React from 'react';
import { Link } from 'react-router';
import style from '../style/Student.css';
import HOCHeader from '../component/HOCHeader';

const link = {
  linkStudent: [
    { to: '/student', title: '自主练习' },
    { to: '/student/test', title: '在线考试' },
    { to: '/student/report', title: '成绩报告' },
    { to: '/student/unsolve', title: '错题集' },
    { to: '/student/favorites', title: '收藏夹' },
    { to: '/student/enhance', title: '强化练习' },
  ],
  linkTeacher: [
    { to: '/teacher', title: '自动组卷' },
    { to: '/teacher/manual', title: '手动组卷' },
    { to: '/teacher/favorites', title: '收藏夹' },
    { to: '/teacher/history', title: '历史组卷' },
    { to: '/teacher/Info', title: '考试报告' },
  ],
};

class Header extends React.Component {
  render() {
    const username = sessionStorage.getItem('username');
    const HeaderOne = HOCHeader(
      <div className={style.userarea}>
        <div className={style.avatar} />
        <div style={{ padding: '.25rem .5rem', fontSize: '1rem' }}>
          {username}
        </div>
      </div>,
    );
    return (
      <div className={style.container}>
        <HeaderOne haveBoxShadow={false} />
        <div className={style.selectBar}>
          <div className={style.header2}>
            <ul className={style.ul}>
              {username === 'student'
                ? link.linkStudent.map((links, i) => (
                  <li key={i} style={{ padding: '10px 50px 18px 0' }}>
                    <Link to={links.to} className={style.linktext}>
                      {links.title}
                    </Link>
                  </li>
                  ))
                : link.linkTeacher.map((links, i) => (
                  <li key={i} style={{ padding: '10px 50px 18px 0' }}>
                    <Link to={links.to} className={style.linktext}>
                      {links.title}
                    </Link>
                  </li>
                  ))}
            </ul>
          </div>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default Header;
