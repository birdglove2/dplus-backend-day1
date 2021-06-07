const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
    },
  },
  {
    collection: 'todo',
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.updatedAt;
      },
    },
  }
);

TodoSchema.index({ title: 1 });

module.exports = mongoose.model('todo', TodoSchema);
