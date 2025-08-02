import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

/**
 * A simple 2D image-based delivery vehicle that moves across the screen.
 * Its horizontal position is directly tied to the loading progress.
 * @param {object} props - The component props.
 * @param {number} props.progress - The loading progress from 0 to 100.
 * @param {boolean} props.isBoosting - A flag to indicate if the boost is active.
 */
const DeliveryVehicleImage = ({ progress, isBoosting }) => {
  // Use a spring for smooth, physics-based movement of the scooter.
  // The 'x' value moves from a far-left position to a far-right position based on progress.
  const { x } = useSpring({
    from: { x: -80 },
    to: { x: (progress / 100) * 160 - 80 },
    config: { mass: 1, tension: 170, friction: 26 }
  });

  // Use another spring for the subtle bobbing motion of the scooter.
  const { y } = useSpring({
    loop: true,
    from: { y: 0 },
    to: [
      { y: -0.5, config: { duration: 500 } },
      { y: 0, config: { duration: 500 } },
    ],
  });

  // Spring for the boost effect (scaling and blur).
  const boostEffect = useSpring({
    scale: isBoosting ? 1.1 : 1,
    filter: isBoosting ? 'blur(1px)' : 'blur(0px)',
    config: { tension: 300, friction: 10 }
  });

  return (
    <animated.div
      style={{
        transform: x.to((val) => `translate3d(${val}vw, ${y.get() * 20}px, 0)`),
      }}
      className="delivery-image-container"
    >
      <animated.img
        style={boostEffect}
        src="https://png.pngtree.com/png-clipart/20241016/original/pngtree-delivery-man-riding-scooter-with-packages-3d-illustration-png-image_16346756.png"
        alt="Delivery Scooter"
        className="delivery-scooter-image"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/250x250/FFF8F0/FC8019?text=Loading...'; }}
      />
    </animated.div>
  );
};

/**
 * The main loader component that displays animated text, a counter,
 * and renders the 2D delivery vehicle with a synchronized loading line.
 */
export default function App() {
  const [count, setCount] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);

  // Animate the width and opacity of the loading line.
  const loadingLineAnimation = useSpring({
    width: `${count}%`,
    opacity: count === 100 ? 0 : 1,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  useEffect(() => {
    const targetCount = 100;
    const counterStartTime = 1500;
    const counterDuration = 4000; // Total duration for the counter
    const counterIntervalTime = counterDuration / targetCount;
    
    let intervalId;

    const startCounter = () => {
      intervalId = setInterval(() => {
        setCount(prev => {
          // Activate boost between 20% and 80% (inclusive)
          if (prev >= 20 && prev <= 80) {
            setIsBoosting(true);
          } else {
            setIsBoosting(false);
          }

          if (prev < targetCount) {
            return prev + 1;
          }
          
          clearInterval(intervalId);
          return targetCount;
        });
      }, counterIntervalTime);
    }

    const counterTimeout = setTimeout(startCounter, counterStartTime);

    return () => {
      clearTimeout(counterTimeout);
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  const loaderStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

    html, body { 
      margin: 0; 
      padding: 0; 
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .landing-animation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      position: relative;
      background-color: #FFF8F0;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      z-index: 1;
    }

    /* Text and Content Styles from AdvancedLoader */
    .loader-content {
      text-align: left;
      max-width: 90%;
      z-index: 10;
      position: relative;
    }
    
    .loader-counter {
      font-size: 1.8rem;
      font-weight: 400;
      margin-bottom: 1.5rem;
      color: #2E2E2E;
      opacity: 0;
      animation: loader-fade-in 0.8s ease-out 0.2s forwards;
    }

    .h1-wrapper {
      overflow: hidden;
      line-height: 1.1;
    }

    .loader-text h1 {
      font-size: clamp(2.5rem, 8vw, 5rem);
      font-weight: 800;
      text-transform: uppercase;
      color: #2E2E2E;
      margin: 0;
      transform: translateY(100%);
      animation: loader-slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .h1-wrapper:nth-of-type(1) h1 { animation-delay: 0.5s; }
    .h1-wrapper:nth-of-type(2) h1 { animation-delay: 1.0s; }

    .loading-line-wrapper {
      position: relative;
      min-height: clamp(2.5rem, 8vw, 5rem);
      height: auto;
      opacity: 0;
      animation: loader-fade-in 0.8s ease-out 1.5s forwards;
    }

    .loading-line {
      position: relative;
      white-space: normal;
      color: #2E2E2E;
    }

    .loading-line .outline {
      display: inline-block;
      animation: toggle-now-style 0.7s step-end 1.5s infinite;
    }

    .wait-message {
      font-size: 0.95rem;
      color: #FC8019;
      margin-top: 3rem;
      opacity: 0;
      animation: loader-fade-in 0.8s ease-out 1.8s forwards;
    }

    .top-line-container {
      display: flex;
      align-items: baseline;
      gap: 1.5rem;
    }

    /* Vehicle and Progress Bar Styles */
    .delivery-image-container {
      position: absolute;
      bottom: 12%;
      left: 50%;
      width: 50vw;
      max-width: 250px;
      height: auto;
      z-index: 5;
    }

    .delivery-scooter-image {
      width: 100%;
      height: auto;
    }

    .loading-line-bar {
      position: absolute;
      bottom: 10%; /* Positioned below the scooter */
      left: 0;
      height: 8px;
      background-color: #FC8019; /* Color from the new theme */
      border-radius: 4px;
      z-index: 4;
    }

    /* Keyframe Animations */
    @keyframes loader-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes loader-slide-up {
      from { transform: translateY(100%); }
      to { transform: translateY(0%); }
    }

    @keyframes toggle-now-style {
      0%, 49.9% {
        color: #FC8019;
        -webkit-text-stroke: 0;
        font-weight: 800;
        font-style: normal;
      }
      50%, 100% {
        color: transparent;
        -webkit-text-stroke: 1px #FC8019;
        font-weight: 400;
        font-style: italic;
      }
    }
  `;

  return (
    <>
      <style>{loaderStyles}</style>
      <div className="landing-animation-container">
        <animated.div style={loadingLineAnimation} className="loading-line-bar" />
        <DeliveryVehicleImage progress={count} isBoosting={isBoosting} />
        <div className="loader-content">
          <div className="loader-text">
            <div className="top-line-container">
              <div className="loader-counter">
                <span>{count}</span>%
              </div>
              <div className="h1-wrapper"><h1>CRAVING</h1></div>
            </div>
            <div className="h1-wrapper"><h1>SOMETHING DELICIOUS?</h1></div>
            <div className="loading-line-wrapper">
              <h1 className="loading-line">
                YOUR NEXT MEAL IS <span className="outline">NEAR</span>
              </h1>
            </div>
          </div>
          <div className="wait-message">
            <p>Finding the best food<br />near you...</p>
          </div>
        </div>
      </div>
    </>
  );
}
