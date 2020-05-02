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

// Hard coded posts list
const posts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

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
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id == args.id) {
            return posts[i];
          }
        }
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
