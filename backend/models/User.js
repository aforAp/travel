import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        maxlength: 10000
    },
    joinedAt: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }, 
  

});

const User = mongoose.model('User', userSchema);

export default User;