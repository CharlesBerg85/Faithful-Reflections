import Header from '../src/components/Header';
import Nav from '../src/components/Nav';
import Footer from '../src/components/Footer';
import Home from '../src/components/Home';
import NewPost from '../src/components/NewPost';
import PostPage from '../src/components/PostPage';
import EditPost from '../src/components/EditPost';
import About from '../src/components/About';
import Missing from '../src/components/Missing';
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from 'easy-peasy';

function App() {
  // Retrieve the setPosts action from easy-peasy
  const setPosts = useStoreActions((actions) => actions.setPosts);
  // Use the useAxiosFetch hook to fetch data from the server
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts')

  // Update the state with the fetched data
  useEffect(() => {
    setPosts(data);
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="Faithful Reflections" />
      <Nav />
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} fetchError={fetchError} />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
