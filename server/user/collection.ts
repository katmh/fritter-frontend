import type {HydratedDocument, Types} from 'mongoose';
import type {User} from './model';
import type {Freet} from '../freet/model';
import UserModel from './model';

type FollowReturn = {
  follower: HydratedDocument<User>;
  followee: HydratedDocument<User>;
};

/**
 * Class with methods for interacting with `users` collection in MongoDB.
 */
class UserCollection {
  /**
   * Add a new user
   *
   * @param {string} username - The username of the user
   * @param {string} password - The password of the user
   * @return {Promise<HydratedDocument<User>>} - The newly created user
   */
  static async addOne(username: string, password: string): Promise<HydratedDocument<User>> {
    const user = new UserModel({
      username,
      password,
      dateJoined: new Date(),
      freets: [],
      follows: [],
      followers: [],
      readingList: []
    });
    await user.save();
    return user;
  }

  /**
   * Find a user by userId.
   *
   * @param {string} userId - The userId of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUserId(userId: Types.ObjectId | string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({_id: userId});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsername(username: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
  }

  /**
   * Find a user by username (case insensitive).
   *
   * @param {string} username - The username of the user to find
   * @param {string} password - The password of the user to find
   * @return {Promise<HydratedDocument<User>> | Promise<null>} - The user with the given username, if any
   */
  static async findOneByUsernameAndPassword(username: string, password: string): Promise<HydratedDocument<User>> {
    return UserModel.findOne({
      username: new RegExp(`^${username.trim()}$`, 'i'),
      password
    });
  }

  /**
   * Update user's information
   *
   * @param {string} userId - The userId of the user to update
   * @param {Object} userDetails - An object with the user's updated credentials
   * @return {Promise<HydratedDocument<User>>} - The updated user
   */
  static async updateOne(userId: Types.ObjectId | string, userDetails: {password?: string; username?: string}): Promise<HydratedDocument<User>> {
    const user = await UserModel.findOne({_id: userId});
    if (userDetails.password) {
      user.password = userDetails.password;
    }

    if (userDetails.username) {
      user.username = userDetails.username;
    }

    await user.save();
    return user;
  }

  /**
   * Delete a user from the collection.
   *
   * @param {string} userId - The userId of user to delete
   * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
   */
  static async deleteOne(userId: Types.ObjectId | string): Promise<boolean> {
    const user = await UserModel.deleteOne({_id: userId});
    return user !== null;
  }

  /**
   * Add a tweet to a user's freets.
   *
   * @param userId - id of freet author
   * @param freetId - id of freet
   */
  static async addFreet(userId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<void> {
    await UserModel.findOneAndUpdate(
      {_id: userId},
      {$addToSet: {freets: freetId}}
    );
  }

  /**
   * Remove a freet from a user's freets.
   * 
   * @param userId - id of freet author
   * @param freetId - id of freet
   */
  static async deleteFreet(userId: Types.ObjectId | string, freetId: Types.ObjectId | string): Promise<void> {
    await UserModel.findOneAndUpdate(
      {_id: userId},
      {$pull: {freets: freetId}}
    );
  }

  /**
   * Have a user follow (denoted the follower) follow another user (the followee).
   *
   * @param {Types.ObjectId | string} followerId - id of follower
   * @param {string} followeeId - ID of followee
   * @return {Promise<FollowReturn>} - object containing updated follower and followee
   */
    static async follow(followerId: Types.ObjectId | string, followeeId: string): Promise<FollowReturn> {
    const followee = await UserModel.findOneAndUpdate(
      {_id: followeeId},
      {$addToSet: {followers: followerId}},
      {new: true} // Return modified document rather than original
    );
    const follower = await UserModel.findOneAndUpdate(
      {_id: followerId},
      {$addToSet: {follows: followee._id}},
      {new: true}
    );
    return {follower, followee};
  }

  /**
   * Have a user follow (denoted the follower) unfollow another user (the followee).
   *
   * @param {Types.ObjectId | string} followerId - id of follower
   * @param {string} followeeId - ID of followee
   * @return {Promise<FollowReturn>} - object containing updated follower and followee
   */
  static async unfollow(followerId: Types.ObjectId | string, followeeId: string): Promise<FollowReturn> {
    const followee = await UserModel.findOneAndUpdate(
      {_id: followeeId},
      {$pull: {followers: followerId}},
      {new: true} // Return modified document rather than original
    );
    const follower = await UserModel.findOneAndUpdate(
      {_id: followerId},
      {$pull: {follows: followee._id}},
      {new: true}
    );
    return {follower, followee};
  }

  /**
   * Get reading list items
   */
  static async getReadingList(userId: Types.ObjectId | string): Promise<HydratedDocument<Freet>[]> {
    const user = await UserModel.findOne({_id: userId})
      .populate({
        path: 'readingList',
        populate: {path: 'authorId', model: 'User'}
      }).exec();
    return user.readingList as unknown as HydratedDocument<Freet>[];
  }

  /**
   * Add freet with ID `freetId` to reading list of user with ID `userId`
   */
   static async addReadingListEntry(userId: Types.ObjectId | string, freetId: Types.ObjectId | string) {
    return UserModel.findOneAndUpdate(
      {_id: userId},
      {$addToSet: {readingList: freetId}},
      {new: true}
    ).populate('readingList');
  }

  /**
   * Remove freet with ID `freetId` from reading list of user with ID `userId`
   */
  static async removeReadingListEntry(userId: Types.ObjectId | string, freetId: Types.ObjectId | string) {
    return UserModel.findOneAndUpdate(
      {_id: userId},
      {$pull: {readingList: freetId}},
      {new: true}
    ).populate('readingList');
  }

  /**
   * Remove all entries from reading list of user with ID `userId`
   */
  static async clearReadingList(userId: Types.ObjectId | string) {
    return UserModel.findOneAndUpdate(
      {_id: userId},
      {$set: {readingList: []}},
      {new: true}
    ).populate('readingList');
  }
}

export default UserCollection;
