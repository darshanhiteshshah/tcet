import React, { useState, useEffect } from 'react';

// The main App component which renders the AdvancedLoader
export default function App() {
  return (
    <AdvancedLoader />
  );
}

// AdvancedLoader component with a percentage counter, text animations, and a scooter
const AdvancedLoader = () => {
  // CSS styles for the loader, defined as a string for easy integration.
  const loaderStyles = `
    /* Container for the entire landing animation */
    .landing-animation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      position: relative;
      background-color: #FFF8F0; /* Reverted to light cream background */
      z-index: 1;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      color: #2e2e2e; /* Dark text for high contrast */
    }
    
    /* Content wrapper to align text */
    .loader-content {
      text-align: left;
      max-width: 90%;
    }
    
    /* Styling for the percentage counter */
    .loader-counter {
      font-size: 1.8rem;
      font-weight: 400;
      margin-bottom: 1.5rem;
      opacity: 0;
      /* Adjusted to start with the first text line */
      animation: loader-fade-in 0.8s ease-out 1.0s forwards; 
    }
    
    /* Keyframe animation for a fade-in effect */
    @keyframes loader-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Wrapper for each h1 to create a slide-up animation effect */
    .h1-wrapper {
      overflow: hidden;
      line-height: 1.1;
    }
    
    /* Styling for the main heading text */
    .loader-text h1 {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 800;
      text-transform: uppercase;
      margin: 0;
      transform: translateY(100%); /* Start position for the animation */
      animation: loader-slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    
    /* Delay the animation for each heading line */
    .h1-wrapper:nth-of-type(1) h1 { animation-delay: 1.0s; }
    .h1-wrapper:nth-of-type(2) h1 { animation-delay: 2.0s; }
    
    /* Keyframe animation for the text to slide up */
    @keyframes loader-slide-up {
      from { transform: translateY(100%); }
      to { transform: translateY(0%); }
    }
    
    /* Wrapper for the "YOUR NEXT MEAL" line */
    .loading-line-wrapper {
      position: relative;
      min-height: clamp(2.5rem, 8vw, 5rem);
      height: auto;
      opacity: 0;
      animation: loader-fade-in 0.8s ease-out 3.0s forwards;
    }
    
    /* Styling for the "ARRIVING" text with a new, smoother transition effect */
    .loading-line .pulsing-word {
      display: inline-block;
      animation: pulse-style 1s infinite alternate ease-in-out 3.0s;
    }
    
    /* Keyframe animation for a smooth color pulse effect, updated to orange */
    @keyframes pulse-style {
      0% {
        color: rgba(252, 128, 25, 0.5); /* Semi-transparent orange */
        font-weight: 400;
        transform: scale(1.0);
      }
      100% {
        color: #FC8019; /* Solid orange */
        font-weight: 800;
        transform: scale(1.1);
      }
    }

    /* Styling for the smaller wait message */
    .wait-message {
      font-size: 0.95rem;
      color: #FC8019;
      margin-top: 3rem;
      opacity: 0;
      /* Adjusted animation delay */
      animation: loader-fade-in 0.8s ease-out 4.0s forwards;
    }

    /* New animation for the last line of text, updated to orange */
    .wait-message-pulse {
        animation: message-pulse 1s infinite alternate ease-in-out 4.0s;
    }

    @keyframes message-pulse {
        0% {
            color: rgba(252, 128, 25, 0.8); /* Semi-transparent orange */
            transform: scale(1);
        }
        100% {
            color: #FC8019; /* Solid orange */
            transform: scale(1.02);
        }
    }
    
    /* Container for the counter and first heading line */
    .top-line-container {
      display: flex;
      align-items: baseline;
      gap: 1.5rem;
    }

    /* New CSS for the scooter animation */
    /* Container to position and animate the scooter */
    .scooter-container {
      position: absolute;
      bottom: 10%;
      left: 0; /* The dynamic style will handle the position from here */
      width: 150px;
      height: 150px;
      opacity: 0;
      /* The scooter animation now has a fixed duration that matches the counter */
      animation: loader-fade-in 0.8s ease-out 0s forwards;
      z-index: 2;
    }
    
    /* We no longer need the scooter-move keyframe as we are controlling the position with JavaScript */
    
    /* Image styling */
    .scooter-png {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `;

  // State to hold the current count value
  const [count, setCount] = useState(0);

  // useEffect hook to handle the counter animation
  useEffect(() => {
    const targetCount = 100;
    const counterStartTime = 500; 
    /* The duration is now shorter and more optimal */
    const counterDuration = 2500;
    const counterIntervalTime = counterDuration / targetCount;

    const counterTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < targetCount) {
            return prevCount + 1;
          }
          clearInterval(intervalId);
          return targetCount;
        });
      }, counterIntervalTime);

      return () => clearInterval(intervalId);
    }, counterStartTime);

    return () => clearTimeout(counterTimeout);
  }, []);

  // Calculate the scooter's horizontal position based on the count.
  const scooterTranslateX = ((window.innerWidth + 150) * count) / 100;

  return (
    <>
      {/* Inject the CSS styles into the DOM */}
      <style>{loaderStyles}</style>

      <div className="landing-animation-container">
        <div className="loader-content">
          <div className="loader-text">
            <div className="top-line-container">
              <div className="loader-counter">
                <span>{count}</span>%
              </div>
              <div className="h1-wrapper"><h1>DELIVERING</h1></div>
            </div>
            <div className="h1-wrapper"><h1>YOUR ORDER</h1></div>
            <div className="loading-line-wrapper">
              <h1 className="loading-line">
                YOUR RIDER IS <span className="pulsing-word">ARRIVING</span>
              </h1>
            </div>
          </div>
          <div className="wait-message wait-message-pulse">
            <p>Your hot and fresh food is<br />just around the corner...</p>
          </div>
        </div>

        {/* Scooter animation using a PNG image */}
        {/* We use an inline style to control the horizontal movement (transform: translateX) */}
        <div className="scooter-container" style={{ transform: `translateX(${scooterTranslateX - 150}px)` }}>
          <img 
            className="scooter-png" 
            src="/del.png"
            alt="Scooter delivering food"
          />
        </div>
      </div>
    </>
  );
};
