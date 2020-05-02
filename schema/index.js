const axios = require('axios');

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
} = require("graphql");

// POST Type
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    userId: { type: GraphQLInt },
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parentValue, args) {

        // Call the REST API using axios. One can use any client for this
        return axios
          .get("https://jsonplaceholder.typicode.com/posts/" + args.id)
          .then((res) => res.data);
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        return posts;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
