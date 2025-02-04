import React from 'react'

 const WaitingforDriver = (props) => {
  return (
    <div>
        <i 
        onClick={()=>
            {props.setwaiting(false)}}
             className='ri-arrow-down-wide-line text-2xl text-center block'></i>
            
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
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>Brahmavara,Udupi</p>
                    </div>
                  </div>
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
    </div> 
     )
}

export default WaitingforDriver
