import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch the post by ID
    const fetchPostById = async () => {
      try {
        const response = await axios.get(`https://your-backend-url/posts/${id}`);
        setPost(response.data);
      } catch (error: any) {
        console.error('Error fetching post:', error.message);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPostById();
  }, [id]);

  // Function to handle post deletion
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://your-backend-url/posts/${id}`);
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting post:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return (
      <main className="PostPage">
        <article className="post">
          <h2>Post not found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit our homepage</Link>
          </p>
        </article>
      </main>
    );
  }

  // Destructure the post object to extract the required properties
  const { title, datetime, body } = post;

  return (
    <main className="PostPage">
      <article className="post">
        <h2>{title}</h2>
        <p className="postDate">{datetime}</p>
        <p className="postBody">{body}</p>
        <Link to={`/edit/${id}`}>
          <button className="editButton">Edit Post</button>
        </Link>
        <button className="deleteButton" onClick={() => handleDelete(id)}>
          Delete Post
        </button>
      </article>
    </main>
  );
};

export default PostPage;
