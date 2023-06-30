import { useStoreState } from 'easy-peasy';
  const today = new Date();
const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className="Footer">
        <p>{postCount} Bible Blog Posts</p>   
    </footer>
  )
}

export default Footer