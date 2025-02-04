import React from 'react'

const  VehiclePanel=(props)=> {
  return (
    <div>
        <i onClick={()=>
            {props.setVehiclePanelOpen(false)
            }}
             className='ri-arrow-down-wide-line text-2xl text-center block'></i>
              <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
              <div onClick={()=>{
                {props.setConfirmRidePanal(true)
                  props.setVehicleType('car')
                }}
              }className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between bg-white p-4'>
                 <img className='h-16 ' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1548646918/assets/e9/2eeb8f-3764-4e26-8b17-5905a75e7e85/original/2.png' alt=''/>
                 <div className='w-1/2 '>
                   <h4 className='font-medium text-base'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
                   <h5 className='font-medium text-sm'>2 mins away</h5>
                   <p className='font-normal text-xs text-gray-600' >Affordable,compact rides</p>
                 </div>
                 <h2 className='text-xl font-semibold ml-2'>Rs.{props.fare.car}</h2>
              </div>
              <div onClick={()=>{props.setConfirmRidePanal(true)
                props.setVehicleType('moto')
              }}
              className='flex border-2 border-black mb-2 rounded-xl w-full p-3 items-center justify-between bg-white p-4'>
                 <img className='h-16 ' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' alt=''/>
                 <div className='w-1/2 '>
                   <h4 className='font-medium text-base'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
                   <h5 className='font-medium text-sm'>2 mins away</h5>
                   <p className='font-normal text-xs text-gray-600' >Affordable motorcycle rides</p>
                 </div>
                 <h2 className='text-xl font-semibold ml-2'>Rs.{props.fare.moto}</h2>
              </div>
              <div onClick={()=>{props.setConfirmRidePanal(true)
                props.setVehicleType('auto')
              }} className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between bg-white p-4'>
                 <img className='h-16 ' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt=''/>
                 <div className='w-1/2 '>
                   <h4 className='font-medium text-base'>Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
                   <h5 className='font-medium text-sm'>1 mins away</h5>
                   <p className='font-normal text-xs text-gray-600' >Affordable auto rides</p>
                 </div>
                 <h2 className='text-xl font-semibold ml-2'>Rs.{props.fare.auto}</h2>
              </div>
    </div>
  )
}

export default VehiclePanel