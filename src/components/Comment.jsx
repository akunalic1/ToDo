import React, { useState, useEffect, createRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faComment, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./../css/comment.css";
import server from "../api/server";

const Comment = ({ todo }) => {
  const [commentExist, setCommentExist] = useState(false);
  const [openComment, setOpenComent] = useState(false);
  const [commentText, setCommentText] = useState(todo.comment);

  const handleOpenComment = (e) => {
    setOpenComent(!openComment);
  };

  const handleSubmitComment = () => {
    if (commentText.trim().length) {
      server.patch(`/todos/${todo.id}`, {
        comment: commentText,
      });
      setCommentExist(true);
    }
    setOpenComent(false);
  };

  const handleDeleteComment = (e) => {
    server.patch(`/todos/${todo.id}`, {
      comment: "",
    });
    setCommentExist(false);
    setOpenComent(false);
    setCommentText("");
  };

  useEffect(() => {
    setCommentExist(todo.comment !== "");
  }, []);

  return (
    <div className="comment-wrapper">
      <button onClick={handleOpenComment} className="comment-btn">
        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
        <div className={commentExist ? `comment-exist` : ""}></div>
      </button>
      <div>
        <div
          className={`comment-content ${
            !openComment || commentExist ? "hide" : ""
          }`}
        >
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input-field"
            placeholder="Write..."
          ></textarea>
          <button onClick={handleSubmitComment} className="btn-save-comment">
            OK
          </button>
        </div>
        {/*
         * existing comment container
         */}
        <div
          className={`comment-container ${
            !openComment || !commentExist ? "hide" : ""
          }`}
        >
          <p className={`comment-content comment-text`}>{commentText}</p>
          <button onClick={handleDeleteComment} className="delete-comment">
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
