const axios = require("axios");

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
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
        return axios
          .get("https://jsonplaceholder.typicode.com/posts/")
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLInt) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        //POST the data
        return axios
          .post("https://jsonplaceholder.typicode.com/posts/", {
            userId: args.id,
            title: args.title,
            body: args.body,
          })
          .then((res) =>{ return res.data});
      },
    },
    deletePost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        //POST the data
        return axios
          .delete("https://jsonplaceholder.typicode.com/posts/" + args.id)
          .then((res) => res.data);
      },
    },
    editPost: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLInt },
        title: { type: GraphQLString },
        body: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        //POST the data
        return axios
          .patch("https://jsonplaceholder.typicode.com/posts/" + args.id , args)
          .then((res) => {
            console.log(res.data);
            return res.data
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
