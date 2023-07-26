import { useState, useEffect } from 'react';
import axios from 'axios';
import Feed from '../components/Feed';

interface Post {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

const Home = () => {
  // State variables for storing the fetched posts, fetch error, and loading status
  const [posts, setPosts] = useState<Post[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      // Send a GET request to fetch posts from your backend
      const response = await axios.get<Post[]>('https://your-backend-url/posts');
      setPosts(response.data);
      setFetchError(null);
    } catch (error: any) {
      console.error('Error fetching posts:', error.message);
      setFetchError('Error fetching posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch the posts when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="Home">
      {/* Display loading message if isLoading is true */}
      {isLoading && <p className="statusMsg">Loading posts...</p>}

      {/* Display fetch error message if fetchError exists */}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}

      {/* Display Feed component if posts exist, otherwise display no posts message */}
      {!isLoading && !fetchError && (posts.length ? <Feed posts={posts} /> : <p className="statusMsg">No posts to display.</p>)}
    </main>
  );
};

export default Home;
