import React from 'react'
import img from './assets/istockphoto-1094780808-612x612.jpg'
export default function Popup(props) {
  return (
    <>
      <div className='popup'>
        <div className="popup-inner">
            <h2 className='close' onClick={props.onclick}>x</h2>
            <br />
            <br />
           <div className='tick'>
           <img src={img}  />
           </div>
            <h2 className="text2">You have succesfully singed up!</h2>
        </div>

      </div>
    </>
  )
}
