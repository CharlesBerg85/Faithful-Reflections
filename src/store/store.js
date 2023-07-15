import { createStore, action, thunk, computed } from "easy-peasy";
import api from '../api/posts';

// Function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export default createStore({
  // Array to store the posts
  posts: [],

  // Action to set the posts in the state
  setPosts: action((state, payload) => {
    state.posts = [...payload];
  }),

  // State for the post title
  postTitle: '',

  // Action to set the post title in the state
  setPostTitle: action((state, payload) => {
    state.postTitle = payload;
  }),

  // State for the post body
  postBody: '',

  // Action to set the post body in the state
  setPostBody: action((state, payload) => {
    state.postBody = payload;
  }),

  // State for the edited post title
  editTitle: '',

  // Action to set the edited post title in the state
  setEditTitle: action((state, payload) => {
    state.editTitle = payload;
  }),

  // State for the edited post body
  editBody: '',

  // Action to set the edited post body in the state
  setEditBody: action((state, payload) => {
    state.editBody = payload;
  }),

  // State for search query
  search: '',

  // Action to set the search query in the state
  setSearch: action((state, payload) => {
    state.search = payload;
  }),

  // Array to store search results
  searchResults: [],

  // Action to set the search results in the state
  setSearchResults: action((state, payload) => {
    state.searchResults = payload;
  }),

  // Computed property to get the count of posts
  postCount: computed((state) => state.posts.length),

  // Computed property to get a post by ID
  getPostById: computed((state) => {
    return (id) => state.posts.find(post => post.id === parseInt(id));
  }),

  // Thunk to save a new post
// Thunk to save a new post
savePost: thunk(async (actions, newPost, { getState }) => {
  try {
    const { posts } = getState();
    const id = generateUniqueId(); // Generate a unique ID
    const response = await api.post('/posts', { ...newPost, id }); // Assign the ID to the new post
    const savedPost = response.data;
    actions.setPosts([...posts, savedPost]);
    actions.setPostTitle('');
    actions.setPostBody('');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}),


  // Thunk to delete a post
deletePost: thunk(async (actions, id) => {
  try {
    await api.delete(`/posts/${id}`);
    actions.setPosts(state.posts.filter(post => post.id !== id));
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}),

// Thunk to edit a post
editPost: thunk(async (actions, updatedPost) => {
  const { id } = updatedPost;
  try {
    const response = await api.put(`/posts/${id}`, updatedPost);
    const editedPost = response.data;
    actions.setPosts(
      state.posts.map(post => (post.id === id ? editedPost : post))
    );
    actions.setEditTitle('');
    actions.setEditBody('');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
})
});
