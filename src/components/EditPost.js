import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { format } from "date-fns";

const EditPost = () => {
    // Access the ID parameter from the URL
    const { id } = useParams();

    // Get the necessary state and actions from the store
    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);
    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    const getPostById = useStoreState((state) => state.getPostById);

    // Get the post with the specified ID from the store
    const post = getPostById(id);

    // Set the editTitle and editBody when the post is fetched
    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody]);

    // Hook to navigate to other pages
    const navigate = useNavigate();

    // Handle the edit action
    const handleEdit = async (id) => {
        // Format the current datetime
        const datetime = format(new Date(), "MMMM dd, yyyy pp");

        // Create the updated post object
        const updatedPost = { id, title: editTitle, datetime, body: editBody };

        // Call the editPost action to update the post
        editPost(updatedPost);

        // Navigate back to the homepage
        navigate("/");
    };

    return (
        <main className="NewPost">
            {/* If editTitle is available */}
            {editTitle &&
                <>
                <h1>Edit Post</h1>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title: </label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post: </label>
                    <textarea
                        id="postBody"
                        required
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    {/* Button to submit the edited post */}
                    <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                </form>
                </>
            }
            {/* If editTitle is not available */}
            {!editTitle &&
                <>
                <h1>Post Not Found</h1>
                <p>Well, that's disappointing.</p>
                <p>
                {/* Link to navigate back to the homepage */}
                <Link to="/">Visit Our Homepage</Link>
                </p>
                </>
            }
        </main>  
    )
}

export default EditPost;
