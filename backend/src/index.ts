import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { DateTypeDefinition } from 'graphql-scalars';

import { entities } from './entities.js'
import { resolvers } from './resolvers.js'

const server = new ApolloServer({
    typeDefs: [DateTypeDefinition, entities],
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`🚀  Backend ready at: ${url}`);
