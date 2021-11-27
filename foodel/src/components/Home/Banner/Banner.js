import React from 'react';
import useAuth from '../../../hooks/useAuth';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Banner = () => {
    const { foodContext } = useAuth();
    const { foods } = foodContext;
    const food1 = foods[0]?.food;
    const food2 = foods[1]?.food;
    const food3 = foods[2]?.food;
    const food4 = foods[3]?.food;
    const food5 = foods[4]?.food;
    const food6 = foods[5]?.food;

    const des1 = foods[0]?.description.slice(0, 30);
    const des2 = foods[1]?.description.slice(0, 30);
    const des3 = foods[2]?.description.slice(0, 30);
    const des4 = foods[3]?.description.slice(0, 30);
    const des5 = foods[4]?.description.slice(0, 30);
    const des6 = foods[5]?.description.slice(0, 30);

    const img1 = foods[0]?.img_url;
    const img2 = foods[1]?.img_url;
    const img3 = foods[2]?.img_url;
    const img4 = foods[3]?.img_url;
    const img5 = foods[4]?.img_url;
    const img6 = foods[5]?.img_url;

    /*  */
    const bg1 = {
        backgroundImage: `url(${img1})`, backgroundSize: 'cover', minHeight: '80vh'
    }
    const bg2 = {
        backgroundImage: `url(${img2})`, backgroundSize: 'cover', minHeight: '80vh'
    }
    const bg3 = {
        backgroundImage: `url(${img3})`, backgroundSize: 'cover', minHeight: '80vh'
    }
    const bg4 = {
        backgroundImage: `url(${img4})`, backgroundSize: 'cover', minHeight: '80vh'
    }
    const bg5 = {
        backgroundImage: `url(${img5})`, backgroundSize: 'cover', minHeight: '80vh'
    }
    const bg6 = {
        backgroundImage: `url(${img6})`, backgroundSize: 'cover', minHeight: '80vh'
    }
    const prev = `<i class="fas fa-backward bg-limegreen text-white p-2 rounded-pill"></i>`;
    const next = `<i class="fas fa-forward bg-limegreen text-white p-2 rounded-pill"></i>`;
    const options = {
        margin: 30,
        responsiveClass: true,
        nav: true,
        autoplay: true,
        navText: [prev, next],
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            600: {
                items: 2,
            },
            700: {
                items: 3,
            },
            1000: {
                items: 4,
            }
        },
    };
    /*  */

    return (
        <div>
            {
                foods.length === 0 ?
                    <div className="d-flex justify-content-evenly align-items-center mx-auto" style={{ minHeight: "90vh" }}>
                        <img src="https://i.pinimg.com/originals/dc/66/53/dc6653448a617b0564541708101d3eac.gif" className="img-fluid col-md-2 col-6 mx-auto" alt="" />
                    </div>
                    :
                    <div id="banner">
                        <OwlCarousel className='owl-theme' autoplay={true} loop nav {...options}>
                            <div className='d-flex justify-content-end flex-column align-items-center col-12' style={bg1}>
                                <div className="bg-blur p-md-3 m-md-3">
                                    <h6 className="fw-bold text-light">{food1}</h6>
                                    <small className="font-small">{des1}</small>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end flex-column align-items-center col-12' style={bg2}>
                                <div className="bg-blur p-md-3 m-md-3">
                                    <h6 className="fw-bold text-light">{food2}</h6>
                                    <small className="font-small">{des2}</small>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end flex-column align-items-center col-12' style={bg3}>
                                <div className="bg-blur p-md-3 m-md-3">
                                    <h6 className="fw-bold text-light">{food3}</h6>
                                    <small className="font-small">{des3}</small>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end flex-column align-items-center col-12' style={bg4}>
                                <div className="bg-blur p-md-3 m-md-3">
                                    <h6 className="fw-bold text-light">{food4}</h6>
                                    <small className="font-small">{des4}</small>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end flex-column align-items-center col-12' style={bg5}>
                                <div className="bg-blur p-md-3 m-md-3">
                                    <h6 className="fw-bold text-light">{food5}</h6>
                                    <small className="font-small">{des5}</small>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end flex-column align-items-center col-12' style={bg6}>
                                <div className="bg-blur p-md-3 m-md-3">
                                    <h6 className="fw-bold text-light">{food6}</h6>
                                    <small className="font-small">{des6}</small>
                                </div>
                            </div>
                        </OwlCarousel>
                    </div>
            }
        </div>
    );
};

export default Banner;