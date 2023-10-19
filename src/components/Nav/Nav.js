import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const isLogin = !!localStorage.getItem('accessToken');
  const [userData, setUserData] = useState([]);

  const getUserInfoData = () => {
    fetch('Info데이터 주소', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'accessToken',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      });
  };

  useEffect(() => {
    getUserInfoData();
  }, []);

  const { nickname, badgeImageUrl } = userData;

  // 댓글알람기능 구현중,전역상태관리
  // cosnt handleAlarm = () => {
  // };

  const authenticatedNavigate = (path) => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const goToMain = () => {
    navigate('/main');
  };

  const goToCommunity = () => {
    navigate('/community');
  };

  const goToSubscribe = () => authenticatedNavigate('/subscribe');
  const goToCondition = () => authenticatedNavigate('/info');
  const goToLocation = () => authenticatedNavigate('/');
  const goToGuideLine = () => authenticatedNavigate('/');

  const handleLogAuto = () => {
    localStorage.removeItem('accessToken');
    alert('로그아웃 완료');
    window.location.reload();
  };

  return (
    <nav className="nav">
      <div className="logoSection">
        <img src="images/Logo.png" onClick={goToMain} alt="메인로고사진없음" />
      </div>
      <div className="navList">
        <button onClick={goToSubscribe}>구독</button>
        <button onClick={goToCommunity}>커뮤니티</button>
        <button onClick={goToGuideLine}>운동법</button>
        <button onClick={goToLocation}>위치</button>
        {isLogin && <button onClick={goToCondition}>상태페이지</button>}
        {isLogin && <img src={badgeImageUrl} alt="챌린지이미지" />}
        {isLogin ? (
          <button className="btnLogAuto" onClick={handleLogAuto}>
            {nickname}/로그아웃
          </button>
        ) : (
          <Link className="btnSignUp" to="/login">
            로그인
          </Link>
        )}
        {/* <img
          src="images/chatImage.png"
          alt="알림이미지"
          onClick={handleAlarm}
        />{' '}
        피드 댓글 알람기능 구현중 */}
      </div>
    </nav>
  );
};

export default Nav;
