import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';
import './Subscribe.scss';

const Subscribe = () => {
  const [subscribeData, setSubscribeData] = useState({});
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [popup, setPopup] = useState({});
  const navigate = useNavigate();
  // const TOKEN = localStorage.getItem('accessToken');

  // 결제 페이지로 데이터 전달하기
  const goPayment = () => {
    const orderSubscribeId = selectedCheckbox.subscribeId;
    navigate('/order', { state: { subscribeId: orderSubscribeId } });
  };

  const closePopup = () => {
    setPopup({ ...popup, open: false });
  };

  useEffect(() => {
    // if (accessToken) {
    getUserSubscribeData();
    // }
  }, []);

  const getUserSubscribeData = () => {
    fetch('/data/subscribeData.json', {
      // http://10.58.52.67:8000/subscribe

      headers: {
        'Content-Type': 'application/json',
        // Authorization: TOKEN,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setSubscribeData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCheckboxChange = (option) => {
    setSelectedCheckbox(option);
  };

  const handleOrderButton = (selectedCheckbox) => {
    if (selectedCheckbox) {
      if (subscribeData.status === 1) {
        setPopup({
          open: true,
          title: '이미 구독한 상태입니다.',
          leftBtnValue: '구독연장하기',
          rightBtnValue: '닫기',
          leftBtnClick: goPayment,
          rightBtnClick: closePopup,
        });
      }
    } else {
      alert('구독하실 개월 수를 선택해주세요.');
    }
  };

  // 사용자가 로그인하지 않았다면 로그인 페이지로 리다이렉션
  // if (!TOKEN) {
  //   return <Redirect to="/login" />;
  // }

  const isEmpty = Object.keys(subscribeData).length === 0;

  if (isEmpty) return null;

  return (
    <div className="subscribe">
      <section>
        <div className="sectionInner flexCenter">
          <h2>
            <span className="checkIcon">
              <img src="/images/icon-check.png" alt="" />
            </span>
            위트 구독하기
          </h2>
          <p>
            WEE.T를 구독하시고 <b>트레이너의 맞춤 관리</b>를 경험해보세요. 구독
            중이신 경우, <b>구독기간이 연장</b>됩니다.
          </p>
        </div>
      </section>
      <section className="secondSection">
        <div className="sectionInner">
          <form className="subscribeContent">
            <ul className="flexCenter">
              {subscribeData.data?.map((option) => (
                <li key={option.subscribeId}>
                  <div className="paymentWrap">
                    <div className="checkInputDiv">
                      <input
                        type="checkbox"
                        id={option.subscribeId}
                        className="subscribeCheck"
                        checked={
                          selectedCheckbox
                            ? selectedCheckbox.subscribeId ===
                              option.subscribeId
                            : false
                        }
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <label htmlFor={option.subscribeId} />
                    </div>
                    <div className="paymentMonth">{`${option.month}개월`}</div>
                    <div className="paymentInfo">
                      전문 트레이너의 맞춤 관리를 합리적인 가격으로 이용할 수
                      있습니다.
                    </div>
                    <div className="paymentPlan">
                      <p>
                        <strong>{option.price.toLocaleString()}</strong>
                        <b>원</b>
                        <span>/ 월</span>
                      </p>
                      <span className="paymentOriginal">{`${(
                        option.price * 2
                      ).toLocaleString()} 원`}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="btnDiv">
              <button
                className="orderBtn"
                type="button"
                onClick={() => handleOrderButton(selectedCheckbox)}
              >
                결제하기
              </button>
            </div>
          </form>
        </div>
      </section>
      {popup.open && (
        <Popup
          title={popup.title}
          leftBtnValue={popup.leftBtnValue}
          rightBtnValue={popup.rightBtnValue}
          leftBtnClick={popup.leftBtnClick}
          rightBtnClick={popup.rightBtnClick}
        />
      )}
    </div>
  );
};

export default Subscribe;
