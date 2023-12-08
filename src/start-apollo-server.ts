import { makeExecutableSchema } from '@graphql-tools/schema';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import  db from './models'
import { Express } from 'express-serve-static-core';
import { typeDefs, resolvers } from './modules'
import applyDirective from './directives';
let schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

schema = applyDirective(schema);

const startApolloServer = async(app: Express) => {
  try {
    const server = new ApolloServer({
        schema,
      });

      await server.start();

      app.use(`/api/graphql`, expressMiddleware(server, {
        context: async (ctx: { req: any; res: any; }) => {
          return {
            ...ctx,
            req: ctx.req,
            res: ctx.res,
            Sequelize: db.Sequelize,
            models: db.models,
            sequelize: db.sequelize,
          };
        },
      }));

  } catch (error) {
    console.error('error from startApolloServer >>',error);
    throw error
  }
}

export default startApolloServer;