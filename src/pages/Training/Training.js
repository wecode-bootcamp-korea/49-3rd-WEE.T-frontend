import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './Training.scss';
import TrainingContainer from '../../components/TrainingContainer/TrainingContainer';

const Training = () => {
  const [trainingData, setTrainingData] = useState({});
  const [currentWeight, setCurrentWeight] = useState();
  const [targetWeight, setTargetWeight] = useState();
  const shoulderIcon = '/images/dog.jpg';
  const backIcon = '/images/dog.jpg';
  const lowerBodyIcon = '/images/dog.jpg';
  const chestIcon = '/images/dog.jpg';
  const armIcon = '/images/dog.jpg';

  function calculateCompletionRate(currentWeight, targetWeight) {
    if (currentWeight <= targetWeight) {
      return 100;
    } else {
      return ((targetWeight / currentWeight) * 100).toFixed(1);
    }
  }

  const completionRate = calculateCompletionRate(currentWeight, targetWeight);
  const remainingWeight = currentWeight - targetWeight;

  useEffect(() => {
    fetch('/data/training.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === 'READ_SUCCESS') {
          setTrainingData(result.data);
          setCurrentWeight(result.data.currentWeight);
          setTargetWeight(result.data.targetWeight);
        } else {
          alert('오류입니다. 관리자에게 문의하세요.');
        }
      });
  }, []);
  if (!trainingData) {
    return null;
  }
  return (
    <div className="Training">
      <section className="sectionInner">
        <h2 className="pageLogo">
          <img src="/images/icon-exercise.png" alt="운동법 아이콘" />
        </h2>
        <h1 className="pageText">위트 맞춤 트레이닝</h1>
        <p className="subText">
          '위트'에서 고객 건강 정보를 바탕으로 제공하는 운동법 정보입니다.
        </p>
        <p className="subNoticeText">
          *위트에서는 모든 운동 시작 전 가볍게 런닝 30분을 권장드립니다.
        </p>
        <div className="userTrainingInfo">
          <div className="userNotice">
            <p className="badge">
              <img src="/images/icon-fat.png" alt="체중계 아이콘" />
            </p>
            <span className="userNickname">{trainingData.nickname}</span>님
            목표체중까지&nbsp;&nbsp;
            <span className="userCal"> {remainingWeight}kg </span>
            &nbsp;남았습니다.
          </div>
          <div className="userWeightBarWrapper">
            <span className="weight">{trainingData.weight}kg</span>
            <div className="targetWeightBar">
              <p className="currentBar" style={{ width: `${completionRate}%` }}>
                {currentWeight}kg
              </p>
            </div>
            <span className="target">{trainingData.targetWeight}kg</span>
          </div>
        </div>

        <div className="TrainingContentWrapper">
          <div className="trainingContainer">
            <h1 className="todayText">
              <p className="todayDate">2023.10.18</p>
              &nbsp; &nbsp; {trainingData.nickname}님 오늘의 추천 트레이닝
              &nbsp; &nbsp;
            </h1>
            <TrainingContainer
              trainingData={trainingData.shoulder}
              iconImg={shoulderIcon}
              exerciseArea={'어깨 운동'}
            />
            <TrainingContainer
              trainingData={trainingData.back}
              iconImg={backIcon}
              exerciseArea={'등 운동'}
            />
            <TrainingContainer
              trainingData={trainingData.lowerBody}
              iconImg={lowerBodyIcon}
              exerciseArea={'하체 운동'}
            />
            <TrainingContainer
              trainingData={trainingData.chest}
              iconImg={chestIcon}
              exerciseArea={'가슴 운동'}
            />
            <TrainingContainer
              trainingData={trainingData.arm}
              iconImg={armIcon}
              exerciseArea={'팔 운동'}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Training;
