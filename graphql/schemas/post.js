const { gql } = require('apollo-server-express');

module.exports = gql`
	type Post {
		id: Int!
		title: String!
		content: String!
		author: User!
		comments: [Comment!]
		created_at: String
	}

	extend type Query {
		getAllPosts: [Post!]
		getSinglePost(post_id: Int!): Post
	}

	extend type Mutation {
		createPost(title: String!, content: String!): CreatePostResponse
	}

	type CreatePostResponse {
		id: Int!
		title: String!
		content: String!
		created_at: String!
	}
`;
