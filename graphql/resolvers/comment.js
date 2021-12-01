const { Post } = require('../../database/models');
const { AuthenticationError, ApolloError } = require('apollo-server-express');

module.exports = {
	Mutation: {
		async createComment(_, { content, post_id }, { user = null }) {
			if (!user) {
				throw new AuthenticationError('You must login to create a comment');
			}

			const post = await Post.findByPk(post_id);

			if (!post) {
				throw new ApolloError('Unable to create a comment');
			}

			return post.createComment({ content, user_id: user.id });
		}
	},
	Comment: {
		author(comment) {
			return comment.getAuthor();
		},
		post(comment) {
			return comment.getPost();
		}
	}
}