import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {
  // Get the post ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // Access the deletePost and getPostById actions from the store
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);

  // Retrieve the post by ID from the store
  const post = getPostById(id);

  // Function to handle post deletion
  const handleDelete = async (id) => {
    // Call the deletePost action and pass the post ID
    await deletePost(id);
    // Navigate back to the homepage after deletion
    navigate("/");
  };

  return (
    <main className="PostPage">
        <article className="post">
            {/* Check if the post exists */}
            {post &&
              <>
                {/* Display the post title */}
                <h2>{post.title}</h2>
                {/* Display the post date */}
                <p className="postDate">{post.datetime}</p>
                {/* Display the post body */}
                <p className="postBody">{post.body}</p>
                {/* Link to edit the post */}
                <Link to={`/edit/${post.id}`}>
                  <button className='editButton'>Edit Post</button>
                </Link>
                {/* Button to delete the post */}
                <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                  Delete Post
                </button>
              </>
            }
            {/* Display a message if the post is not found */}
            {!post &&
              <>
                <h2>Post not found</h2>
                <p>Well, that's disappointing.</p>
                <p>
                  <Link to="/">Visit our homepage</Link>
                </p>
              </>
            }
        </article>
    </main>
  );
};

export default PostPage;
