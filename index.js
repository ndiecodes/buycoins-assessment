const { ApolloServer, gql } = require("apollo-server");

const {
  AllowedTypes,
  GET_BTC_USD_PRICE,
  getPurchaseRate,
} = require("./services/priceService");

const typeDefs = gql`
  enum AllowedTypes {
    BUY
    SELL
  }
  type Query {
    calculatePrice(
      type: AllowedTypes
      margin: Float
      exchangeRate: Float
    ): Float
  }
`;

const resolvers = {
  AllowedTypes,
  Query: {
    calculatePrice: async (_, args) => {
      if (args.margin > 100) {
        throw new Error("margin should be less than 100");
      }
      const btcPrice = await GET_BTC_USD_PRICE();
      return getPurchaseRate(btcPrice, args);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
