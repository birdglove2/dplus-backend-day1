const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    collection: 'user',
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.updatedAt;
      },
    },
  }
);

UserSchema.index({ name: 1 });

module.exports = mongoose.model('user', UserSchema);
