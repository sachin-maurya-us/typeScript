import { join } from 'path';

import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

const typesArray = [
  ...loadFilesSync(join(__dirname, './**/*.graphql')),
];

const resolverArray = loadFilesSync(join(__dirname, './**/*.resolvers.*'));

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolverArray);

export { typeDefs, resolvers };
