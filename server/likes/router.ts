import express from 'express';
import type {Request, Response} from 'express';

/**
 * View all the freets liked by the currently logged in user.
 *
 * @name GET /api/likes
 *
 * @return {Freet[]} - List of freets liked by the currently logged in user
 * @throws {403} - If user is not logged in
 */

/**
 * Add the freet with ID `freetId` to the currently logged in user's likes,
 * if it's not already in there. Idempotent.
 *
 * @name POST /api/likes/:freetId
 * @return {string} - Success message
 * @throws {403} - If user is not logged in
 * @throws {404} - If no freet exists with ID freetId
 */

/**
 * Remove the freet with ID `freetId` from the currently logged in user's likes,
 * if it's in there. Idempotent.
 *
 * @name
 */
