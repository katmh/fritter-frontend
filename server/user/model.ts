import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

export type User = {
  _id: Types.ObjectId;
  username: string;
  password: string;
  dateJoined: Date;
  follows: Types.ObjectId[];
  followers: Types.ObjectId[];
  readingList: Types.ObjectId[];
};

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateJoined: {
    type: Date,
    required: true
  },
  follows: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  readingList: [{
    type: Schema.Types.ObjectId,
    ref: 'Freet',
    required: true
  }]
});

const UserModel = model<User>('User', UserSchema);
export default UserModel;
