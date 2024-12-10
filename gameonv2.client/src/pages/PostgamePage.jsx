import React, { useState } from "react";
import PostForm from "../components/PostForm";
import PostTile from "../components/PostTile";
import "../styles/Postgame.css";

const PostgamePage = () => {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editPost, setEditPost] = useState(null);

    const handleNewPost = () => {
        setShowForm(true);
        setEditPost(null);
    };

    const handleFormSubmit = (postData) => {
        if (editPost) {
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === editPost.id ? { ...editPost, ...postData } : post
                )
            );
        } else {
            setPosts([...posts, { ...postData, id: Date.now() }]);
        }
        setShowForm(false);
    };

    const handleEdit = (postId) => {
        const postToEdit = posts.find((post) => post.id === postId);
        setEditPost(postToEdit);
        setShowForm(true);
    };

    const handleDelete = (postId) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
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
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default PostgamePage;
