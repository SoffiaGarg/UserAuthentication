import Mongoose from 'mongoose';
import {mongoConnectionUrl} from '../Config/config';
import { logger } from '../Utils/logger';

//Connect to Mongoose
const dbConnection = async () => {
  Mongoose.connect(mongoConnectionUrl, {useNewUrlParser: true}, (err) => {
    if (err) {
      throw new Error(Messages.unableToConnect);
    } else {
     logger.info(
        'Mongo connection successful with database'
      );
    }
  });
};
export default dbConnection;