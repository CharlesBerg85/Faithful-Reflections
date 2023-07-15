import Feed from '../components/Feed';
import { useStoreState } from 'easy-peasy';

const Home = ({ fetchError, isLoading }) => {
    // Retrieve the searchResults from the store state
    const { searchResults } = useStoreState((state) => state);
    
    return (
        <main className="Home">
            {/* Display loading message if isLoading is true */}
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            
            {/* Display fetch error message if fetchError exists */}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            
            {/* Display Feed component if searchResults exist, otherwise display no posts message */}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home;
