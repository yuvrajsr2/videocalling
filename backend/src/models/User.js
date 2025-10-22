import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        minlength:6,
    },
    
    bio:{
        type:String,
        default:"",
    },

    profilePic:{
        type:String,
        default:"",
    },

    nativeLanguage:{
        type:String,
        default:"",
    },

    learningLanguage:{
        type:String,
        default:"",
    },

    location:{
        type:String,
        defualt:"",
    },

    isOnboarded:{
        type:Boolean,
        default:false,
    },
    
    friends:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]





}, {timestamps:true});



const User = mongoose.model("User", userSchema);


// pre hook
// hashing password
userSchema.pre("save", async function(next){


    if (!this.isModified("password")) return next();



    try {
        const salt = await bcrypt.genSalt(10);

        // this means whatever user that signed up acces tyheir password and then hash it
        this.password = await bcrypt.hash(this.password, salt);


        next();
    } catch (error) {
        next(error);
        
    }
})

export default User;


// thing to build tomorrow: the routes like first route to build signup route 37 14