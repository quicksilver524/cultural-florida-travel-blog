const sequelize = require('../config/connection');
const {User, Post} = require('../models');

const userdata = [
    {
        username: 'test01',
        nickname: 'nickname-test01',
        email: 'test01@test.com',
        password: 'password123'
    }, {
        username: 'test02',
        nickname: 'nickname-test02',
        email: 'test02@test.com',
        password: 'password123'
    }, {
        username: 'test03',
        nickname: 'nickname-test03',
        email: 'test03@test.com',
        password: 'password123'
    }, {
        username: 'test04',
        nickname: 'nickname-test04',
        email: 'test04@test.com',
        password: 'password123'
    },

];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;