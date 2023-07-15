import { Link } from 'react-router-dom';

const Missing = () => {
    return (
        <main className="Missing">
            {/* Heading for post not found */}
            <h2>Post not found</h2>
            
            {/* Message for post not found */}
            <p>Well, that's disappointing.</p>
            
            {/* Link to the homepage */}
            <p>
                <Link to="/">Visit our homepage</Link>
            </p>
        </main>
    );
};

export default Missing;
