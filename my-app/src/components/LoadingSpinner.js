import React from 'react';
import './LoadingSpinner.css'; // Import your CSS file for styling

const LoadingSpinner = () => {
    const text={
        fontWeight:'bold',
        fontSize:'30px',
        marginRight:'20px',
        color:'#46703b',
        marginRight:'2rem'
    }
  return (
    <div className="loading-spinner" >
        <h3 style={text}>Take a Chill-Pill while we analyze!😎</h3>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;