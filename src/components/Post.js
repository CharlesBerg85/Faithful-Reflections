import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  return (
    <article className="post">
        {/* Link to the individual post page */}
        <Link to={`/post/${post.id}`}>
            {/* Display the post title */}
            <h2>{post.title}</h2>
            {/* Display the post date */}
            <p className="post-date">{post.datetime}</p>        
        </Link>
        {/* Display the truncated post body */}
        <p className="postBody">
            {/* If the post body length is less than or equal to 25 characters, display the full body. Otherwise, display the first 25 characters with ellipsis */}
            {(post.body).length <= 25
                ? post.body
                : `${(post.body).slice(0, 25)}...`
            }
        </p>
    </article>
  );
};

export default Post;
