import bcrypt from 'bcrypt';
import { Schema,model } from 'mongoose';
import { role, status } from '../../src/utils/common/enum.js';


const schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  recoveryEmail: { type: String },
  DOB: { type: Date, required: true },
  mobileNumber: { type: String, unique: true, required: true },
  role:
   { 
    type: String, 
    enum:Object.values(role) , //['User', 'Company_HR']
    required: true 
  },
  status: 
  { 
    type: String,
     enum: Object.values(status), //['online', 'offline']
     default: status.OFFLINE 
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },

  resetCode: String,
  isverify: {
        type: Boolean,
        default: false
    },
  isDeleted:
  {
    type:Boolean,
    default:false
  }
},{
    timestamps:true,
    versionKey:false,
    autoCreate:true
});



schema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(8);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

// Hash the password before updating the user
schema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(8);
      update.password = await bcrypt.hash(update.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});


// schema.pre('save',async function(){
//   const salt = await bcrypt.genSalt(8);
//     if(this.password) this.password =await bcrypt.hash(this.password,salt)
//  })
//  schema.pre('findOneAndUpdate', function () {
//      if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
//  })
 
 export const User = model("User", schema)