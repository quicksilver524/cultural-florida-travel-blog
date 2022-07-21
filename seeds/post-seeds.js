const {Post} = require('../models');

const postdata = [
    {
        title: 'St. Augustine Fountain of Youth',
        cover_url: 'https://www.floridashistoriccoast.com/things-to-do/history/fountain-youth/',
        post_body: ' Beautiful historic place, loved visiting, left looking 5 years younger!',
        view_count: 10,
        user_id: 1
    }, {
        title: 'eat',
        cover_url: 'https://images.unsplash.com/photo-1657802021135-13fbd579fbb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2448&q=80',
        post_body: 'As Sulimaniyah, Riyadh Saudi Arabia\n' +
            'Published 6 days ago\n' +
            'Apple, iPhone 6\n' +
            'Free to use under the Unsplash License',
        view_count: 16,
        user_id: 2
    },{
        title: 'eat',
        cover_url: 'https://images.unsplash.com/photo-1657802021135-13fbd579fbb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2448&q=80',
        post_body: 'As Sulimaniyah, Riyadh Saudi Arabia\n' +
            'Published 6 days ago\n' +
            'Apple, iPhone 6\n' +
            'Free to use under the Unsplash License',
        view_count: 16,
        user_id: 2
    },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
