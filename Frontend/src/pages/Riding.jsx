import React from 'react'
import { Link } from 'react-router-dom'
const Riding = () => {
  return (
    <div className='h-screen'>
        <Link to='/home' className='right-2 top-2 fixed h-10 w-10 bg-white flex items-center justify-center rounded-full '>
            <i className='text-lg fount-medium ri-home-5-line '></i>
        </Link>
        <div className='h-1/2'>
        <img className='w-full h-full object-cover' src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/pass/GoogleMapTA.jpg" alt="" />
         
        </div>
        <div className='h-1/2 p-5'>
        <div className='flex items-center justify-between'>
              <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png' alt=''/>
              <div className='text-right'>
                <h2 className='text-lg font-medium'>Name</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>KA20 MB 1234</h4>
                <p className='text-sm text-gray-600'>Swift</p>
              </div>
            </div>
            
            <div className='flex gap-3 justify-between items-center bg-white p-4 rounded-xl flex-col'>
               <div className='w-full '>
                  {/* <div className='p-3 border-b-2 flex items-center gap-5 '>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>Brahmavara,Udupi</p>
                    </div>
                  </div> */}
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>Brahmavara,Udupi</p>
                    </div>
                  </div>

                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs.193.20</h3>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                  </div>
               </div>
            </div>
            <button className='w-full bg-green-600 text-white font-semibold rounded-lg p-2'>Make payment</button>
        </div>
    </div>
  )
}

export default Riding