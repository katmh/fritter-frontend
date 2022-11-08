import express from 'express';
import type {Request, Response} from 'express';

import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';
import UserCollection from '../user/collection';
import UserModel from '../user/model';
import { HydratedDocument } from 'mongoose';
import type {Freet} from '../freet/model';

const router = express.Router();

/**
 * Get reading list of currently logged in user.
 * 
 * @name GET /api/readinglist
 * 
 * @return {ReadingListResponse} - The currently logged in user's reading list
 * @throws {403} - If user is not logged in
 */
router.get(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId as string;
    const user = await UserModel.findOne({_id: userId})
      .populate({
        path: 'readingList',
        populate: {
          path: 'authorId',
          model: 'User'
        }
      })
      .exec();
    const readingList = user.readingList as unknown as HydratedDocument<Freet>[];
    res.status(200).json({
      message: 'Successfully fetched reading list.',
      readingList: util.constructReadingListResponse(readingList)
    })
  }
)

/**
 * Add freet with given ID to reading list of currently logged in user. Idempotent.
 *
 * @name POST /api/readinglist/:id
 *
 * @return {string} - Success message
 * @throws {403} - If user is not logged in
 * @throws {404} - If freetId is not valid
 */
router.post(
  '/:freetId',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const {freetId} = req.params;
    const userId = req.session.userId as string;
    await UserCollection.addReadingListEntry(userId, freetId);
    res.status(200).json({
      message: 'Successfully added freet to reading list.'
    });
  }
);

/**
 * Remove freet with given ID from reading list of currently logged in user. Idempotent.
 *
 * @name DELETE /api/readinglist/:id
 *
 * @return {string} - Success message
 * @throws {403} - If user is not logged in
 * @throws {404} - If freetId is not valid
 */
router.delete(
  '/:freetId',
  [
    userValidator.isUserLoggedIn,
    freetValidator.isFreetExists
  ],
  async (req: Request, res: Response) => {
    const {freetId} = req.params;
    const userId = req.session.userId as string;
    await UserCollection.removeReadingListEntry(userId, freetId);
    res.status(200).json({
      message: 'Successfully removed freet from reading list.'
    });
  }
);

/**
 * Remove all freets from reading list of currently logged in user. Idempotent.
 *
 * @name DELETE /api/readinglist/
 *
 * @return {string} - Success message
 * @throws {403} - If user is not logged in
 */
router.delete(
  '/',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    const userId = req.session.userId as string;
    await UserCollection.clearReadingList(userId);
    res.status(200).json({
      message: 'Successfully cleared reading list.'
    });
  }
);

export {router as readingListRouter};
