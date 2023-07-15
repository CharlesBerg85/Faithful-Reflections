import { useStoreState } from 'easy-peasy';

const Footer = () => {
  // Retrieve the postCount state using useStoreState hook
  const postCount = useStoreState((state) => state.postCount);
  
  return (
    <footer className="Footer">
        {/* Display the postCount value in the paragraph */}
        <p>{postCount} Bible Blog Posts</p>   
    </footer>
  )
}

export default Footer;
