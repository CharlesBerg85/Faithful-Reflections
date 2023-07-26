import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'src/components/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';
import Home, { HomeProps } from 'src/components/Home';
import NewPost from 'src/components/NewPost';
import PostPage from 'src/components/PostPage';
import EditPost from 'src/components/EditPost';
import About from 'src/components/About';
import Missing from 'src/components/Missing';

// Define the Post type here
interface Post {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>('http://localhost:3000/posts');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching posts. Please try again later.');
  }
};

function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchPostsData = async () => {
    setIsLoading(true);
    setFetchError(null);

    try {
      const data = await fetchPosts();
      setPosts(data);
    } catch (error: any) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsData();
  }, []);

  return (
    <div className="App">
      <Header title="Faithful Reflections" />
      <Nav />
      {/* Pass the isLoading, fetchError, and posts props to the Home component */}
      <Home isLoading={isLoading} fetchError={fetchError} posts={posts} />
      <NewPost />
      <EditPost />
      <PostPage />
      <About />
      <Missing />
      <Footer />
    </div>
  );
}

export default Index;
