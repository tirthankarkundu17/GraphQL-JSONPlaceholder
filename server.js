const express = require("express"); // import express

const app = express(); // initialize app

const graphqlHTTP = require("express-graphql"); // import express-graphql for the interactive UI GraphiQL

const postSchema = require("./schema"); // import the schema

const PORT = process.env.PORT || 3000; // Hard coded port on which the server will run

app.listen(PORT, () => {
  console.log(`Server is up on ${PORT}`);
});


// Creates the interactive GraphiQL UI
app.use(
  "/graphql",
  graphqlHTTP({
    schema: postSchema,
    graphiql: true,
  })
);
