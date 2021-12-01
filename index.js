require('dotenv').config();

const port = process.env.PORT || 5000;
const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
const context = require('./graphql/context');
const app = express();

app.use(cors());

const startServer = async () => {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		context,
		introspection: true,
		playground: {
			settings: {
				'schema.polling.enable': false
			}
		}
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({ app, path: '/api' });

	const server = createServer(app);

	process.on('uncaughtException', (err) => {
		console.error(`${(new Date()).toUTCString()} uncaughtException:`, err);
		process.exit(0);
	});

	process.on('unhandledRejection', (err) => {
		console.error(`${(new Date()).toUTCString()} unhandledRejection:`, err);
	});

	server.listen({ port }, () => console.log(
		`🚀 Server ready at http://localhost:${port}/api`,
	));
};

startServer();