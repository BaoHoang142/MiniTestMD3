import React from 'react'
import "./Loading.scss"
export default function Loading() {
  return (
    <>
      <div id='spinner'>
          <div className="spinner-container">
              
            <p style={{marginLeft:"-8px"}}>Loading...</p>
            <div class="loading-spinner">
          </div>
          </div>
      </div>
    </>
    
  )
}
