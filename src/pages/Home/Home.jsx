import React from 'react';
import './Home.css';
import kids_img from '../../assets/kids.jpg'

const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Welcome to the Time Kids Hour Blog - Learn, Play & Grow
                    </h1>
                </div>
            </section>

            {/* Search Section */}
            <section className="search-section">
                <div className="search-container">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search blogs, activities, or topics..."
                            className="search-input"
                        />
                        <button className="search-button">Search</button>
                    </div>
                </div>
            </section>


            <div className='kids_image'>
                <img src={kids_img} alt="" />
            </div>
        </div>
    );
};

export default Home;