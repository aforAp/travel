import mongoose from 'mongoose';

const CreateTripSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  travelStyle: {
    type: String,
    required: true
  },
  interest: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  groupType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date
  },
  imageUrls: {
    type: [String],
    required: true
  },
  tripsData: {
    type: Object,
    required: true
  }
});

const createTrip = mongoose.model('CreateTrip', CreateTripSchema);

export default createTrip;
