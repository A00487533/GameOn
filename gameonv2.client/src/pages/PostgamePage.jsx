import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import PostTile from "../components/PostTile";
import "../styles/Postgame.css";

// Function to fetch all posts from the API
const fetchPosts = async () => {
    try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
            throw new Error("Failed to fetch posts");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// Function to create a new post via API
const createPost = async (postData) => {
    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error("Failed to create post");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Function to update an existing post via API
const updatePost = async (postId, postData) => {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) {
            throw new Error("Failed to update post");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

// Function to delete a post via API
const deletePost = async (postId) => {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete post");
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const PostgamePage = () => {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editPost, setEditPost] = useState(null);

    // Fetch posts when the component mounts
    useEffect(() => {
        const loadPosts = async () => {
            const fetchedPosts = await fetchPosts();
            setPosts(fetchedPosts);
        };
        loadPosts();
    }, []);

    const handleNewPost = () => {
        setShowForm(true);
        setEditPost(null);
    };

    const handleFormSubmit = async (postData) => {
        if (editPost) {
            const updatedPost = await updatePost(editPost.id, postData);
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === editPost.id ? { ...updatedPost } : post
                )
            );
        } else {
            const newPost = await createPost(postData);
            setPosts([...posts, newPost]);
        }
        setShowForm(false);
    };

    const handleEdit = (postId) => {
        const postToEdit = posts.find((post) => post.id === postId);
        setEditPost(postToEdit);
        setShowForm(true);
    };

    const handleDelete = async (postId) => {
        const isDeleted = await deletePost(postId);
        if (isDeleted) {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        }
    };

    return (
        <div className="page-container">
            <h1>Create A New Post</h1>
            <button className="new-post-button" onClick={handleNewPost}>
                New Post
            </button>

            {showForm && (
                <PostForm
                    onSubmit={handleFormSubmit}
                    onCancel={() => setShowForm(false)}
                    initialData={editPost}
                />
            )}

            <h1>Your Postings</h1>

            <div className="tiles-container">
                {posts.map((post) => (
                    <PostTile
                        key={post.id}
                        post={post}
                        onEdit={() => handleEdit(post.id)}
                        onDelete={() => handleDelete(post.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostgamePage;
