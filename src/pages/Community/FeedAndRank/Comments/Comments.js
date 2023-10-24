import React, { useEffect, useState } from 'react';
import Comment from './Comment/Comment';
import CommentList from './CommentList/CommentList';
import './Comments.scss';

const Comments = (feedId) => {
  const TOKEN = localStorage.getItem('accessToken');
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    fetchCommentList();
  }, []);

  const fetchCommentList = () => {
    fetch(`/data/commentData.json`, {
      // /data/commentData.json
      // endpoint/comments/${feedId}
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(TOKEN && { Authorization: TOKEN }),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.comments);
        setCommentData(data.data.comments);
      });
  };

  if (commentData.length === 0) {
    return null;
  }

  return (
    <section className="comments">
      <div className="commentDiv">
        {TOKEN && (
          <Comment feedId={feedId} fetchCommentList={fetchCommentList} />
        )}
        <CommentList
          feedId={feedId}
          fetchCommentList={fetchCommentList}
          commentData={commentData}
        />
      </div>
    </section>
  );
};

export default Comments;
