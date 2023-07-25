import { useEffect, useState } from 'react';
import Header from 'src/components/Header';
import Nav from 'src/components/Nav';
import Footer from 'src/components/Footer';
import Home from 'src/components/Home';
import NewPost from 'src/components/NewPost';
import PostPage from 'src/components/PostPage';
import EditPost from 'src/components/EditPost';
import About from 'src/components/About';
import Missing from 'src/components/Missing';

function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Function to fetch posts from the server
  const fetchPostsData = () => {
    setIsLoading(true);
    setFetchError(null);

    fetchPosts()
      .then((response) => setPosts(response.data))
      .catch((error) => setFetchError(error.message))
      .finally(() => setIsLoading(false));
  };

  // Fetch posts when the component mounts
  useEffect(() => {
    fetchPostsData();
  }, []);

  return (
    <div className="App">
      <Header title="Faithful Reflections" />
      <Nav />
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
