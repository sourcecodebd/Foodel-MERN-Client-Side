import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
    const backgroundStyle = {
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), URL(/foodel-brand-copyright.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '90vh'
    }

    return (
        <div className="text-white" style={backgroundStyle}>
            <h1 className="p-3 bg-blur">About Us</h1>
            <div className="container row d-flex justify-content-center align-items-center mx-auto">
                <div className="col-md-6 my-3">
                    <img src="/favicon.png" className="img-fluid" width="350px" alt="" />
                </div>
                <div className="stylish-text col-md-6 bg-blur p-5 my-3 text-dark">
                    <blockquote className="about-us font-large">
                        Fast delivery, deals & discounts and the best choice of restaurants. Order now! Delicious meals delivered fresh to your door. Browse our menu & order online! Hot Meals Delivered Fast. Enjoy Healthy meals. Order In 4 Easy Steps. Types: Chicken, Salads, Healthy Food, Sandwich, Falooda Pizza.
                    </blockquote>
                    <small className="fw-bold font-med">
                        - Nafi Mahmud
                        CEO, Foodel
                    </small>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;