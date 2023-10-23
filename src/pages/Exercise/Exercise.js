import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Exercise.scss';
import DietContainer from '../../components/DietContainer/DietContainer';

const Exercise = () => {
  const [dietData, setDietData] = useState();
  const breakfastIcon = '/images/icon-sun.png';
  const lunchIcon = '/images/icon-lunch-sun.png';
  const dinnerIcon = '/images/icon-moon.png';

  useEffect(() => {
    fetch('/data/exercise.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'READ_SUCCESS') {
          setDietData(result.data);
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  }, []);
  if (!dietData) {
    return null;
  }
  return (
    <div className="Exercise">
      <section className="sectionInner">
        <h2 className="pageLogo">
          <img src="/images/icon-exercise.png" alt="운동법 아이콘" />
        </h2>
        <h1 className="pageText">위트 맞춤 추천 식단</h1>
        <p className="subText">
          '위트'에서 고객 건강 정보를 바탕으로 제공하는 식단 정보입니다.
        </p>
        <div className="userDietInfo">
          <div className="userNotice">
            <p className="badge">
              <img src="/images/icon-bread.png" alt="빵 아이콘" />
            </p>
            <span className="userNickname">{dietData.nickname}</span>
            님의 하루 섭취 권장 칼로리는
            <span className="userCal"> {dietData.dailyCalorieIntake}kcal </span>
            입니다.
          </div>
          <div className="userNutrient">
            <p className="NutrientCircle">
              <span className="nutrientText">탄수화물</span>
              <span className="carbonhydrate nutrientNum">
                {dietData.carbohydrate}
                <span className="fontSizeThin">g</span>
              </span>
            </p>
            <p className="protein NutrientCircle">
              <span className="nutrientText">단백질</span>
              <span className="protein nutrientNum">
                {dietData.protein}
                <span className="fontSizeThin">g</span>
              </span>
            </p>
            <p className="fat NutrientCircle">
              <span className="nutrientText">지방</span>
              <span className="fat nutrientNum">
                {dietData.fat}
                <span className="fontSizeThin">g</span>
              </span>
            </p>
          </div>
        </div>
        <div className="dietContentWrapper">
          <div className="todayDietContainer dietContainer">
            <h1 className="todayText">
              <p className="todayDate">2023.10.18</p>
              &nbsp; &nbsp; {dietData.nickname}님 오늘의 식단&nbsp; &nbsp;
            </h1>
            <DietContainer
              dietData={dietData.today.breakfast}
              mealTime="아침"
              iconImg={breakfastIcon}
            />
            <DietContainer
              dietData={dietData.today.lunch}
              mealTime="점심"
              iconImg={lunchIcon}
            />
            <DietContainer
              dietData={dietData.today.dinner}
              mealTime="저녁"
              iconImg={dinnerIcon}
            />
          </div>
          <div className="todayDietContainer dietContaine">
            <h1 className="todayText">
              <p className="todayDate">2023.10.19</p>
              &nbsp; &nbsp; 김세연님 내일 식단&nbsp; &nbsp;
            </h1>

            <DietContainer
              dietData={dietData.tomorrow.breakfast}
              mealTime="아침"
              iconImg={breakfastIcon}
            />

            <DietContainer
              dietData={dietData.tomorrow.lunch}
              mealTime="점심"
              iconImg={lunchIcon}
            />

            <DietContainer
              dietData={dietData.tomorrow.dinner}
              mealTime="저녁"
              iconImg={dinnerIcon}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exercise;