import React from 'react';
import './Advertise.css';

const Advertise = () => {

    return (
        <div>
            <div className="p-5 bg-limegreen">
                <h1 className="black">Sit at Home</h1>
                <i className="far fa-laugh-wink text-white fa-5x mt-1 mb-3"></i>
                <h1 className="text-white">We Will Take Care</h1>
                <p className="lines-charm mb-4"></p>
                <div className="d-lg-flex justify-content-center align-items-center mx-auto gap-5">
                    <div className="advertise bg-white shadow p-5 rounded-pill col-md-2 limegreen">
                        <i className="fas fa-truck fa-3x mb-1"></i>
                        <h6>
                            Fast Delivery
                        </h6>
                        <h6>in 1 Hour</h6>
                    </div>
                    <div className="advertise bg-white shadow p-5 rounded-pill col-md-2 limegreen">
                        <i className="fab fa-android fa-3x mb-1"></i>
                        <h6>
                            Amazing Mobile
                        </h6>
                        <h6>App</h6>
                    </div>
                    <div className="advertise bg-white shadow p-5 rounded-pill col-md-2 limegreen">
                        <i className="fas fa-street-view fa-3x mb-1"></i>
                        <h6>
                            Wide
                        </h6>
                        <h6>Coverage Map</h6>
                    </div>
                    <div className="advertise bg-white shadow p-5 rounded-pill col-md-2 limegreen">
                        <i className="fas fa-paper-plane fa-3x mb-1"></i>
                        <h6>
                            More Than
                        </h6>
                        <h6>150 Couriers</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Advertise;