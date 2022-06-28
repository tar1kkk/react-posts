import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, title, remove }) {
	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>{title}</h1>
			{posts.map((post, index) => {
				return < PostItem number={index + 1} post={post} remove={remove} key={index} />
			})}
		</div>
	);
}

export default PostList;