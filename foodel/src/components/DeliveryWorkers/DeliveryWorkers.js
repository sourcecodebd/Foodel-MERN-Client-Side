import React from 'react';
import { Carousel } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import Rating from 'react-rating';

const DeliveryWorkers = () => {
    const fullSymbol = 'fa fa-star';

    const { workerContext } = useAuth();
    const { workers } = workerContext;
    const worker1 = workers[0]?.delivery_worker;
    const worker2 = workers[1]?.delivery_worker;
    const worker3 = workers[2]?.delivery_worker;
    const worker4 = workers[3]?.delivery_worker;
    const worker5 = workers[4]?.delivery_worker;
    const worker6 = workers[5]?.delivery_worker;
    const worker7 = workers[6]?.delivery_worker;
    const worker8 = workers[7]?.delivery_worker;

    const rating1 = workers[0]?.rating;
    const rating2 = workers[1]?.rating;
    const rating3 = workers[2]?.rating;
    const rating4 = workers[3]?.rating;
    const rating5 = workers[4]?.rating;
    const rating6 = workers[5]?.rating;
    const rating7 = workers[6]?.rating;
    const rating8 = workers[7]?.rating;

    const deliveries1 = workers[0]?.total_delivery;
    const deliveries2 = workers[1]?.total_delivery;
    const deliveries3 = workers[2]?.total_delivery;
    const deliveries4 = workers[3]?.total_delivery;
    const deliveries5 = workers[4]?.total_delivery;
    const deliveries6 = workers[5]?.total_delivery;
    const deliveries7 = workers[6]?.total_delivery;
    const deliveries8 = workers[7]?.total_delivery;

    const img1 = workers[0]?.img_url;
    const img2 = workers[1]?.img_url;
    const img3 = workers[2]?.img_url;
    const img4 = workers[3]?.img_url;
    const img5 = workers[4]?.img_url;
    const img6 = workers[5]?.img_url;
    const img7 = workers[6]?.img_url;
    const img8 = workers[7]?.img_url;

    return (
        <div className="bg-limegreen py-5">
            <h1 className="text-white">Our Delivery Workers</h1>
            <p className="lines-charm mb-5"></p>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img1}
                        alt="First slide"
                    />
                    <Carousel.Caption className="col-md-3 mx-auto">
                        <h3>{worker1}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating1}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries1}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker2}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating2}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries2}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker3}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating3}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries3}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img4}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker4}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating4}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries4}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img5}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker5}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating5}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries5}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img6}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker6}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating6}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries6}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img7}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker7}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating7}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries7}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block col-md-6 col-12 mx-auto border border-white border-3 rounded-3"
                        src={img8}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>{worker8}</h3>

                        <div className="d-flex justify-content-evenly align-items-center font-med">
                            <div>
                                <Rating
                                    emptySymbol="fa fa-star-o"
                                    placeholderSymbol={fullSymbol}
                                    placeholderRating={rating8}
                                    readonly
                                />
                            </div>
                            <small className="fw-bold">Deliveries Completed: {deliveries8}</small>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default DeliveryWorkers;