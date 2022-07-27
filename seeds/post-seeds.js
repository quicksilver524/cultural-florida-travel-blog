const { Post } = require("../models");

const postdata = [
  {
    title: "St. Augustine Fountain of Youth",
    cover_url:
      "https://www.visitstaugustine.com/sites/default/files/todo/foyarch2015-adj-10x6-web.jpg",
    post_body:
      " Beautiful historic place, loved visiting, left looking 5 years younger!",
    view_count: 10,
    user_id: 1,
  },
  {
    title: "Reef scuba diving",
    cover_url:
      "https://s3-us-west-2.amazonaws.com/imgds360live/product_images/3545331/part_images/1597870247.jpeg",
    post_body:
      "Easily accessible, Molasses Reef Sanctuary Preservation Area is the most heavily visited reef in the Upper Keys – perhaps the world – for diving. Molasses is famous for its clear water, many fish, and numerous boulder corals. It is a classic outer reef with a well-defined spur and groove system of coral development. At the central portion of Molasses, offshore of the light, are a large ship's winch and historic Spanish anchor.",
    view_count: 16,
    user_id: 2,
  },
  {
    title: "eat",
    cover_url:
      "https://images.unsplash.com/photo-1657802021135-13fbd579fbb6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2448&q=80",
    post_body:
      "As Sulimaniyah, Riyadh Saudi Arabia\n" +
      "Published 6 days ago\n" +
      "Apple, iPhone 6\n" +
      "Free to use under the Unsplash License",
    view_count: 16,
    user_id: 2,
  },
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;
