import React, { useEffect, useRef, useState } from 'react';
import FeedImages from './FeedImages/FeedImages';
import Comments from '../Comments/Comments';
import './FeedList.scss';

const FeedList = ({
  feedList,
  totalCount,
  page,
  limit,
  setPaginationParams,
}) => {
  const [moreBtn, setMoreBtn] = useState('댓글 더보기 ▼');
  const [isView, setIsView] = useState(false);
  const listRef = useRef(null);

  const handleView = () => {
    if (moreBtn === '댓글 더보기 ▼') {
      setMoreBtn('댓글 접기 ▲');
      setIsView(true);
    } else {
      setMoreBtn('댓글 더보기 ▼');
      setIsView(false);
    }
  };

  const formatCreatedAt = (created_at) => {
    const formattedDate = new Date(created_at).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return formattedDate;
  };

  // 한 페이지에 표시되는 게시물 수
  const itemsPerPage = 10;

  // 마지막 페이지 계산
  const lastPage = Math.ceil(totalCount / itemsPerPage);

  // 현재 페이지
  const currentPage = parseInt(page) || 1;

  useEffect(() => {
    const { current } = listRef;

    if (!current) return;

    const handleScroll = () => {
      // 현재 페이지가 마지막 페이지보다 크면 동작 중지
      if (currentPage >= lastPage) {
        return;
      }

      if (
        current.scrollTop + current.offsetHeight + 2 > current.scrollHeight &&
        feedList.feeds.length < totalCount &&
        feedList.feeds.length >= page * limit
      ) {
        setPaginationParams();
      }
    };

    current.addEventListener('scroll', handleScroll);

    return () => {
      current.removeEventListener('scroll', handleScroll);
    };
  }, [feedList, totalCount, page]);

  return (
    <ul ref={listRef} className="feedList">
      {feedList.feeds?.map((feed) => (
        <li key={feed.id} className="feedTable">
          <div className="feedContent">
            <div className="userDiv">
              <div className="userInfo">
                <div className="badge">
                  <img src={feed.badge} alt="배지" />
                </div>
                <div className="nickname">{feed.userNickname}</div>
              </div>
              {feed.isMyPost ? (
                <div className="btnBox">
                  <button type="button" className="changeBtn subBtn">
                    수정
                  </button>
                  <button type="button" className="deleteBtn subBtn">
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
            <FeedImages feed={feed} />
            <div className="feedText">
              <div className="text">{feed.content}</div>
              <div className="commentDiv">
                <div className="commentThings">댓글 {feed.comment}개</div>
                <div className="moreView" onClick={handleView}>
                  {moreBtn}
                </div>
                {isView ? <Comments feedId={feed.id} /> : null}
              </div>
              <div className="writeDate">
                {formatCreatedAt(feed.created_at)}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FeedList;
