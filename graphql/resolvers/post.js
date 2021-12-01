const { Post } = require('../../database/models');
const { AuthenticationError } = require('apollo-server-express');

module.exports = {
	Mutation: {
		async createPost(_, { content, title }, { user = null }) {
			if (!user) {
				throw new AuthenticationError('You must login to create a post');
			}
			return Post.create({
				user_id: user.id,
				content,
				title
			});
		}
	},
	Query: {
		async getAllPosts(root, args, context) {
			return Post.findAll();
		},
		async getSinglePost(_, { post_id }, context) {
			return Post.findByPk(post_id);
		}
	},
	Post: {
		author(post) {
			return post.getAuthor();
		},
		comments(post) {
			return post.getComments();
		}
	}
};
