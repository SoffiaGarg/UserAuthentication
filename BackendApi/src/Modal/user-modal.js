import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

class UserClass {
  /** method to get all users **/
  static get(query, fields) {
    return this.findOne(query, fields);
  }

  /** method to add new Role **/
  static add(payload) {
    return this(payload).save();
  }
}

const UserSchema = new Schema({
  name: { type: String, trim: true, required: true },
  email: { type: String, unique:true,required:true},
  password: { type: String, unique:true,required:true},
  token:{type:String,required:false},
  createdAt: {type: Date},
  updatedAt: {type: Date}
});

UserSchema.loadClass(UserClass);

export default Mongoose.model('User', UserSchema);