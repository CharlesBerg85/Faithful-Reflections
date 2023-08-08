import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Nav = () => {
    // Accessing state and actions from the store
    const posts = useStoreState((state) => state.posts);
    const search = useStoreState((state) => state.search);
    const setSearch = useStoreActions((actions) => actions.setSearch);
    const setSearchResults = useStoreActions((actions) => actions.setSearchResults);

    // Filtering posts based on search query
    useEffect(() => {
        const filteredResults = posts.filter(
            (post) =>
                post.body &&
                post.body.toLowerCase().includes(search.toLowerCase()) ||
                post.title &&
                post.title.toLowerCase().includes(search.toLowerCase())
        );

        // Setting the filtered results in the store
        setSearchResults(filteredResults.reverse());
    }, [search, posts, setSearchResults]);

    return (
        <nav className="Nav">
            {/* Search form */}
            <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search:</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            {/* Navigation links */}
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    );
};

export default Nav;
