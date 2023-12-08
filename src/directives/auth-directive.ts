import { MapperKind, getDirective, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import { getUser } from "../utils/get-user";
import { trim, get } from "lodash";

const authDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async (source, args, context, info) => { 
          try {
            const { req } = context;
            
            const authToken = get(context, 'req.headers.authorization');
            if (!authToken) throw new Error('UNAUTHORIZED');

            const user = await getUser(trim(authToken), context.models.User);
            if (!user) throw new Error('UNAUTHORIZED');

            req.user = user;
            
            return await resolve(source, args, context, info);
          } catch (error) {
            console.error(`Error from authDirectiveTransformer ->> ${error}`);
            throw error;
          }
        };
      }
      return fieldConfig;
    },
  });
};

export default authDirectiveTransformer;
