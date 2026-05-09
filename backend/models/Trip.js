import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
    tripDetail: {
        type: String,
        maxLength: 10000,
        required: true
    },
    imageUrls: {
        type: [String],
        maxLength: 5000,
    },
    createdAt: {
        type: Date,
        required: true
    },

    payment_link: {
        type: String,
        required: true
    },

      user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
}

});

const Trip = mongoose.model('Trip', TripSchema);
export default Trip;
