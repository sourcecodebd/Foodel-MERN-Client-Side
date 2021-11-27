import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React, { useState, useEffect } from 'react';
import Food from '../Food/Food';

const Foods = () => {
    const [foods, setFoods] = useState([]);
    useEffect(() => {
        fetch('https://evil-coffin-47333.herokuapp.com/deliveries')
            .then(res => res.json())
            .then(data => {
                setFoods(data);
            })
    }, []);

    return (
        <div className="py-5">
            <h1 className="fw-bold limegreen">Order Your Menu</h1>
            <p className="lines mb-5"></p>
            <div className="px-5">
                <h3 className="col-md-3 fw-medium text-white p-3 bg-limegreen mx-auto"><i className="fas fa-drumstick-bite me-2"></i> Total Foods: {foods?.length}</h3>
            </div>
            <div className="container mx-auto row row-cols-1 row-cols-md-2 row-cols-lg-3 d-flex justify-content-center align-items-center gap-4">
                {
                    foods.length ?
                        foods.map((b, i) => <Food Food={b} key={b._id} />)
                        :
                        <Skeleton count={5} />
                }
            </div>
        </div>
    );
};

export default Foods;