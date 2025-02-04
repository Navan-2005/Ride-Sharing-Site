import React from 'react'

export const RidePopUp = (props) => {
  return (
    <div>
        <i 
        onClick={()=>
            {props.setridepop(false)}}
             className='ri-arrow-down-wide-line text-2xl text-center block'></i>
                <h3 className='ml-20 text-2xl font-semibold mb-5'>New ride available</h3>
               <div className=' bg-yellow-300 rounded-lg flex items-center justify-between'>
                 <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src='https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg'/>
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
                 </div>
                 <h5 className='text-lg font-semibold'>2.2 KM</h5>
               </div>
            
            <div className='flex gap-3 justify-between items-center bg-white p-4 rounded-xl flex-col'>
               <div className='w-full '>
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                    <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>{props.ride?.pickup}</p>
                    </div>
                  </div>
                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-map-pin-2-fill'></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm text-gray-600'>{props.ride?.destination}</p>
                    </div>
                  </div>

                  <div className='p-3 border-b-2 flex items-center gap-5 '>
                  <i className='text-lg ri-currency-line'></i>
                    <div>
                        <h3 className='text-lg font-medium'>Rs.{props.ride?.fare}</h3>
                        <p className='text-sm text-gray-600'>Cash</p>
                    </div>
                  </div>
               </div>
               <button 
                 onClick={()=>{

                  
                  props.setconfirmridepop(true)
                  console.log('Hello');
                  
                  props.confirmRide()
                  console.log('Hello');
                  
                 }}
                 className='w-full bg-green-600 text-white font-semibold rounded-lg p-2'>Accept</button>
                 <button  
                onClick={()=>
                {props.setridepop(false)}}
                 className='w-full bg-gray-300 text-gray-700 font-semibold rounded-lg p-2'>Ignore</button>
            </div>
    </div>
  )
}
