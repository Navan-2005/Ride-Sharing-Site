import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { FinishRide } from '../Components/FinishRide';

const CaptainRiding = () => {
    const [finishride, setfinishride] = useState(false);
    const finishRideRef = useRef(null);

    useGSAP(() => {
        if (finishride) {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(finishRideRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [finishride]);

    return (
        <div className='h-screen w-screen flex flex-col'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-full'>
                <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='Uber Logo' />
                <Link to='/captainhome' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-medium ri-logout-box-r-line'></i>
                </Link>
            </div>
            <div className='flex-grow'>
                <img className='w-full h-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="Map" />
            </div>
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-300'
                onClick={() => { setfinishride(true) }}
            >
                <h5 className='p-1 text-center w-full absolute top-0'>
                    <i className='ri-arrow-down-wide-line text-2xl text-center block'></i>
                </h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className='w-full bg-green-600 text-white font-semibold rounded-lg p-2'>Complete</button>
            </div>
            <div ref={finishRideRef} className='fixed w-full z-10 bottom-0 px-3 py-8 bg-white'>
                <FinishRide setfinishride={setfinishride} />
            </div>
        </div>
    );
};

export default CaptainRiding;