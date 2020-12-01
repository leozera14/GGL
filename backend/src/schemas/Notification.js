const moongose = require('mongoose');
const { Schema } = moongose;

const NotificationSchema =  Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Number,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
})

const Notification = moongose.model('Notification', NotificationSchema); 

module.exports = Notification;