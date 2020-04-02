import _ from "lodash";
import User from "./User";
import Post from "./Post";
import Like from "./Like";
import Follow from "./Follow";
import Comment from "./Comment";
import Message from "./Message";
import Notification from "./Notification";

export default _.merge(
  User,
  Post,
  Like,
  Follow,
  Comment,
  Message,
  Notification
);
