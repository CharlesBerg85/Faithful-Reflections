import React from 'react';
import Post from '../components/Post';

const Feed = ({ posts }) => {
  return (
    <>
        {/* Map over the posts array and render a Post component for each post */}
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </>
  )
}

export default Feed;
