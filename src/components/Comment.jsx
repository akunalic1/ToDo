import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Comment = ({ todo }) => {
  const [comment, setComment] = useState(false);
  const [openComment, setOpenComent] = useState(false);
  const handleOpenComment = (e) => {
    setOpenComent(!openComment);
  };

  useEffect(() => {
    setComment(todo.comment !== "");
  }, []);
  return (
    <div className="comment-wrapper">
      <button onClick={handleOpenComment} className="comment-btn">
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
        <div className={comment ? `comment-exist` : ""}></div>
      </button>
      <div
        className={`comment-content ${!openComment || !comment ? "hide" : ""}`}
      >
        {todo.comment}
      </div>
    </div>
  );
};

export default Comment;
