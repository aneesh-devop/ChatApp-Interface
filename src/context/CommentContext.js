import { createContext, useEffect, useState } from "react";
import data from "../data/data.json";

const CommentContext = createContext();

export const CommentContextProvider = ({ children }) => {
  const [state, setState] = useState(data);

  const [createReply, setCreateReply] = useState(false);

  const { comments, currentUser } = state;

  const addNewComment = (comment) => {
    const newComment = {
      id: comments.at(comments.length - 1).id + 1,
      content: comment,
      // Change time to calculated field
      createdAt: "5 seconds ago",
      replies: [],
      score: 6,
      user: currentUser,
    };
    comments.push(newComment);
    setState((prevState) => ({ ...prevState, comments }));
  };

  const addNewReply = (message, commentId, replyTo) => {
    const comment = comments.find((item) => item.id === commentId);
    const replyToUsername = replyTo ? replyTo : comment.user.username;
    const newReply = {
      id: comment.replies.length
        ? comment.replies.at(comment.replies.length - 1).id + 1
        : 1,
      content: message,
      // Change time to calculated field
      createdAt: "5 seconds ago",
      replyingTo: replyToUsername,
      score: 5,
      user: currentUser,
    };
    comment.replies.push(newReply);
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <CommentContext.Provider
      value={{
        ...state,
        createReply,
        setCreateReply,
        addNewComment,
        addNewReply,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContext;
