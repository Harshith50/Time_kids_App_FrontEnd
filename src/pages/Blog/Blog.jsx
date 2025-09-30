import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Blog.css';

export default function Blog() {
    const [expandedPostId, setExpandedPostId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    const [blogData, setBlogData] = useState([]);

    const [newBlog, setNewBlog] = useState({
        blogImage: null,
        title: '',
        shortContent: '',
        fullContent: ''
    });

    const [imagePreview, setImagePreview] = useState('');

    // Fetch blogs from backend
    const fetchBlogs = async () => {
        try {
            const response = await axios.get("https://time-kids-app-backend.vercel.app/api/blog");
            const data = response.data;
            if (data.success) {
                setBlogData(data.data);
            } else {
                alert("Failed to fetch blogs");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewBlog({ ...newBlog, blogImage: file });

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAddBlog = async (e) => {
        e.preventDefault();

        if (!newBlog.title || !newBlog.shortContent || !newBlog.fullContent) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            const response = await axios.post("https://time-kids-app-backend.vercel.app/api/blog", {
                blogImage: imagePreview ,
                title: newBlog.title,
                shortContent: newBlog.shortContent,
                fullContent: newBlog.fullContent,
            });

            const data = response.data;

            if (data.success) {
                alert("Blog added successfully!");

                fetchBlogs();

                setNewBlog({ blogImage: null, title: '', shortContent: '', fullContent: '' });
                setImagePreview('');
                setShowAddForm(false);
            } else {
                alert("Failed to add blog");
            }
        } catch (error) {
            console.error("Error adding blog:", error);
        }
    };

    const closeModal = () => {
        setShowAddForm(false);
        setNewBlog({ blogImage: null, title: '', shortContent: '', fullContent: '' });
        setImagePreview('');
    };

    const handleDeleteBlog = async (blogId) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            try {
                const response = await axios.delete("https://time-kids-app-backend.vercel.app/api/blog", {
                    data: { id: blogId }
                });

                const data = response.data;

                if (data.success) {
                    alert("Blog deleted successfully");
                    fetchBlogs();

                    if (expandedPostId === blogId) {
                        setExpandedPostId(null);
                    }
                } else {
                    alert("Failed to delete blog");
                }
            } catch (error) {
                console.error("Error deleting blog:", error);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddBlog(e);
    };

    return (
        <div className="blog-wrapper">
            {/* Top bar with Add Blog button */}
            <div className="top-bar">
                <button className="add-blog-btn" onClick={() => setShowAddForm(true)}>
                    Add Blog
                </button>
            </div>

            {/* Modal for adding blog */}
            {showAddForm && (
                <div
                    className="modal-overlay"
                    onClick={(e) => e.target === e.currentTarget && closeModal()}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Add Blog</h3>
                            <button className="close-btn" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Blog Image</label>
                                    <div className="file-input-wrapper">
                                        <input
                                            type="file"
                                            className="file-input"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <div className="file-input-display">
                                            {newBlog.blogImage ? newBlog.blogImage.name : 'Choose file    No file chosen'}
                                        </div>
                                    </div>
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="image-preview" />
                                    )}
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Enter title"
                                        value={newBlog.title}
                                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Short Description</label>
                                    <textarea
                                        className="form-textarea"
                                        placeholder="Enter blog short content"
                                        value={newBlog.shortContent}
                                        onChange={(e) => setNewBlog({ ...newBlog, shortContent: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Blog Content</label>
                                    <textarea
                                        className="form-textarea large content-editor"
                                        placeholder="Enter full content"
                                        value={newBlog.fullContent}
                                        onChange={(e) => setNewBlog({ ...newBlog, fullContent: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={closeModal}>
                                    Close
                                </button>
                                <button type="submit" className="btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Blog list */}
            {blogData.map((blog) => (
                <div key={blog._id || blog.id} className="blog-card">
                    <div className="blog-card-header">
                        <button
                            className="delete-btn"
                            onClick={() => handleDeleteBlog(blog._id || blog.id)}
                            title="Delete blog post"
                        >
                            🗑️
                        </button>
                    </div>
                    <img src={blog.blogImage} alt="Blog" className="blog-image" />
                    <h2 className="blog-title">{blog.title}</h2>

                    <p className="blog-content">
                        {expandedPostId === (blog._id || blog.id) ? blog.fullContent : blog.shortContent}
                    </p>

                    <button
                        className="read-more-btn"
                        onClick={() =>
                            setExpandedPostId(expandedPostId === (blog._id || blog.id) ? null : (blog._id || blog.id))
                        }
                    >
                        {expandedPostId === (blog._id || blog.id) ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            ))}
        </div>
    );
}
