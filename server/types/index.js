import { gql } from "apollo-server-express";

import UserSchema from "./User/schema";
import PostSchema from "./Post/schema";
import LikeSchema from "./Like/schema";
// import DislikeSchema from "./Dislike/schema";
import FollowSchema from "./Follow/schema";
import CommentSchema from "./Comment/schema";
import MessageSchema from "./Message/schema";
import NotificationSchema from "./Notification/schema";

const types = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type Subscription {
    _empty: String
  }

  ${UserSchema}
  ${PostSchema}
  ${MessageSchema}
  ${FollowSchema}
  ${LikeSchema}
  ${CommentSchema}
  ${NotificationSchema}
`;

export default types;
