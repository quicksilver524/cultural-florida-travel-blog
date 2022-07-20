const {Comment} = require('../models');

const commentdata = [
    {
        comment_text: 'wa! i like it.',
        user_id: 3,
        post_id: 1
    }, {
        comment_text: 'wa! i like it too.',
        user_id: 2,
        post_id: 1
    }, {
        comment_text: 'wa! i like it too too.',
        user_id: 1,
        post_id: 1
    }, {
        comment_text: 'wa! i like it.',
        user_id: 2,
        post_id: 2
    }, {
        comment_text: 'wa! i like it.',
        user_id: 3,
        post_id: 2
    },

];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;