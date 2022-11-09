import express from 'express';
import type {Request, Response} from 'express';

import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as util from '../user/util';

const router = express.Router();

/**
 * Get the follows of the currently logged in user.
 * 
 * @name GET /api/follows
 * 
 * @return {string[]} - List of IDs of users that the currently logged in user follows
 * @throws {403} - If user is not logged in
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId as string;
    const user = await UserCollection.findOneByUserId(userId);
    res.status(200).json(user.follows);
  }
)

/**
 * Have the user who is currently logged in (denoted the follower)
 * follow another user (the followee).
 *
 * @name POST /api/follows/:followeeId
 *
 * @return {follower: UserResponse; followee: UserResponse} - The updated follower and followee
 */
router.post(
  '/:followeeId',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const followerId = req.session.userId as string;
    const {followeeId} = req.params;
    const {follower, followee} = await UserCollection.follow(followerId, followeeId);
    res.status(200).json({
      message: 'Follow was successful.',
      follower: util.constructUserResponse(follower),
      followee: util.constructUserResponse(followee)
    });
  }
);

/**
 * Have the user who is currently logged in (denoted the follower)
 * unfollow another user (the followee).
 *
 * @name DELETE /api/follows/:followeeId
 *
 * @return {follower: UserResponse; followee: UserResponse} - The updated follower and followee
 */
router.delete(
  '/:followeeId',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const followerId = req.session.userId as string;
    const {followeeId} = req.params;
    const {follower, followee} = await UserCollection.unfollow(followerId, followeeId);
    res.status(200).json({
      message: 'Unfollow was successful.',
      follower: util.constructUserResponse(follower),
      followee: util.constructUserResponse(followee)
    });
  }
);

export {router as followRouter};
