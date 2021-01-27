import CommentListItem from 'components/Comment';
import React, { Component } from 'react';
import { CommentItem } from './CommenItem';

class Comment extends Component {
	render() {
		return <CommentItem />;
		// return <CommentListItem />;
	}
}
export default Comment;
