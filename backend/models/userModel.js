import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//here or in controller
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//before save encript password
userSchema.pre('save',async function(next){
  //if password field is not modified run
  if(!this.isModified('password')){
    next()
  }
  //if password is modified or when create user hash the password
  const salt =await bcrypt.genSalt(10)
  this.password=await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("User", userSchema);

export default User;
