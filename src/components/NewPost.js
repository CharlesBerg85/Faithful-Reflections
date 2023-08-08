import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
    // Navigation hook from react-router-dom
    const navigate = useNavigate();

    // Accessing state and actions from the store
    const posts = useStoreState((state) => state.posts);
    const postTitle = useStoreState((state) => state.postTitle);
    const postBody = useStoreState((state) => state.postBody);

    const savePost = useStoreActions((actions) => actions.savePost);
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
    const setPostBody = useStoreActions((actions) => actions.setPostBody);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Generating a new unique ID for the post
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const newPost = { id, title: postTitle, datetime, body: postBody };
        // Saving the new post
        savePost(newPost);
        // Navigate back to the home page
        navigate('/');
    };

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                {/* Label for the post title */}
                <label htmlFor="postTitle">Title:</label>
                {/* Input field for the post title */}
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                {/* Label for the post body */}
                <label htmlFor="postBody">Post:</label>
                {/* Textarea for the post body */}
                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                {/* Button to submit the form */}
                <button type="submit">Submit</button>
            </form>
        </main>
    );
    
};

export default NewPost;
