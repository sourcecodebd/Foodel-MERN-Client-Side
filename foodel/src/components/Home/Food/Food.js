import React from 'react';
import Rating from 'react-rating';
import { useHistory } from 'react-router';
import './Food.css';


const Food = ({ Food }) => {
    const { _id, food, description, random_color, price, img_url, rating, rating_count } = Food || {};
    const fullSymbol = 'fa fa-star';

    let history = useHistory();
    const handlePlaceOrder = id => {
        history.push(`/place-order/${id}`);
    }

    return (
        <div className="food-container">
            <div className="food-img">
                <img src={img_url} className="img-fluid" alt={food} />
            </div>
            <div className="food-body" style={{ backgroundColor: random_color }}>
                <div className="food-details">
                    <h6 className="food-title"><i className="fas fa-utensils me-1"></i> {food}</h6>
                    <div className="d-flex justify-content-around align-items-center">
                        <div>
                            <Rating
                                emptySymbol="fa fa-star-o"
                                placeholderSymbol={fullSymbol}
                                placeholderRating={rating}
                                readonly
                            />
                        </div>
                        <small className="fw-bold">Reviews({rating_count})</small>
                    </div>
                    <h4><small className="fs-6">BDT. </small>{price}</h4>
                    <p className="font-small">(additional charge applicable)</p>
                    <p className="description justify"><span className="fw-bold fs-6">Description:</span> {description.slice(0, 150) ? description.slice(0, 150) + '...' : description}</p>
                    <button onClick={() => handlePlaceOrder(_id)} className="mt-3 btn btn-light text-success fw-bold text-uppercase shadow"><i className="fas fa-shopping-cart"></i> Purchase</button>
                </div>
            </div>
        </div >
    );
};

export default Food;