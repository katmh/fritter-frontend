import moment from 'moment';
import type {HydratedDocument} from 'mongoose';
import type {Freet, PopulatedFreet} from '../freet/model';

export type FreetResponse = {
  _id: string;
  author: any;
  content: string;
  dateCreated: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string =>
  moment(date).format('MMM d, yyyy h:mm a').toLowerCase();

/**
 * Transform a raw Freet object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Freet>} freet - A freet
 * @returns {FreetResponse} - The freet object formatted for the frontend
 */
const constructFreetResponse = (freet: HydratedDocument<Freet>): FreetResponse => {
  // Cosmetics; prevents returning of __v property
  const freetCopy: PopulatedFreet = {...freet.toObject({versionKey: false})};

  console.log({
    ...freetCopy,
    _id: freetCopy._id.toString(),
    author: freetCopy.authorId, // Populated
    dateCreated: formatDate(freet.dateCreated)
  });

  return {
    ...freetCopy,
    _id: freetCopy._id.toString(),
    author: freetCopy.authorId, // Populated
    dateCreated: formatDate(freet.dateCreated)
  };
};

export {
  constructFreetResponse
};
