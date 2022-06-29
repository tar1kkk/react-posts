import React from 'react';
import PostItem from './PostItem';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';

function PostList({ posts, title, remove }) {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>{title}</h1>
			<TransitionGroup>
				{posts.map((post, index) =>
					<CSSTransition key={post.id} timeout={500} classNames="post">
						< PostItem number={index + 1} post={post} remove={remove} />
					</CSSTransition>
				)}
			</TransitionGroup>
		</div>
	);
}

export default PostList;