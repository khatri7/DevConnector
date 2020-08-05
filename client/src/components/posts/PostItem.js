import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  liked,
  deletePost,
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  const [like, setLike] = useState(liked);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted <Moment fromNow>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              type="button"
              onClick={async (e) => {
                like ? await removeLike(_id) : await addLike(_id);
                setLike(!like);
              }}
              className="btn btn-light"
            >
              {like ? (
                <i className="fas fa-heart like-color"></i>
              ) : (
                <i className="far fa-heart"></i>
              )}{" "}
              <span>{likes.length}</span>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-light">
              <i className="far fa-comment-alt" />{" "}
              <span>{comments.length}</span>
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                onClick={(e) => deletePost(_id)}
                className="btn btn-light"
              >
                <i className="fas fa-trash like-color"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  liked: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
