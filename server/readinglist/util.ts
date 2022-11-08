import type {HydratedDocument} from 'mongoose';
import type {Freet} from '../freet/model';
import * as freetUtil from '../freet/util';

type ReadingListResponse = any[];

const constructReadingListResponse = (readingList: HydratedDocument<Freet>[]): ReadingListResponse => {
  return readingList.map((freet) => freetUtil.constructFreetResponse(freet));
}

export {
  constructReadingListResponse
};
