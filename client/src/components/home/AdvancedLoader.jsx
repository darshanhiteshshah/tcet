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
    from: { y: 0 },
    to: async (next) => {
      while (1) {
        await next({ y: -0.5, config: { duration: 500 } });
        await next({ y: 0, config: { duration: 500 } });
      }
    },
    loop: true,
  });
  
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
      />
    </animated.div>
  );
};

/**
 * The main loader component that displays an animated counter, text,
 * and renders the 2D delivery vehicle with a synchronized loading line.
 */
export default function App() {
  const [count, setCount] = useState(0);
  const [toggleStyle, setToggleStyle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isBoosting, setIsBoosting] = useState(useState(false));

  // Animate the text's transform based on the scooter's progress.
  const contentAnimation = useSpring({
    opacity: showText ? 1 : 0,
    transform: showText ? 'translate(-50%, -50%)' : 'translate(-150%, -50%)',
    config: { mass: 1, tension: 180, friction: 20 },
    delay: 500,
  });
  
  // Animate the width and opacity of the loading line.
  const loadingLineAnimation = useSpring({
    width: `${count}%`,
    opacity: count === 100 ? 0 : 1,
    config: { mass: 1, tension: 200, friction: 20 },
  });

  useEffect(() => {
    let counterDuration = 4000;
    if (isBoosting) {
      counterDuration = 1000; // Drastically reduce duration for boost
    }
    const targetCount = 100;
    const counterStartTime = 1500;
    const counterIntervalTime = counterDuration / targetCount;
    
    let intervalId;

    const startCounter = () => {
      intervalId = setInterval(() => {
        setCount(prev => {
          if (prev >= 20 && prev < 80) {
            setIsBoosting(true);
          } else {
            setIsBoosting(false);
          }
          if (prev === 55) {
            setShowText(true);
          }
          if (prev < targetCount) {
            return prev + 1;
          }
          clearInterval(intervalId);
          return targetCount;
        });
      }, counterIntervalTime);
    }

    const counterTimeout = setTimeout(() => {
      startCounter();
    }, counterStartTime);

    return () => {
      clearTimeout(counterTimeout);
      clearInterval(intervalId);
    };
  }, [isBoosting]);

  useEffect(() => {
    const styleInterval = setInterval(() => {
      setToggleStyle(prev => !prev);
    }, 500);
    return () => clearInterval(styleInterval);
  }, []);

  const loaderStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

    html, body { margin: 0; padding: 0; }

    .landing-animation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      position: relative;
      background: linear-gradient(to bottom, #f4f6f8, #e8edf3);
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
    }

    /* Rain effect */
    .rain-effect {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: repeating-linear-gradient(
        -45deg,
        rgba(0, 0, 0, 0.1) 0,
        rgba(0, 0, 0, 0.1) 1px,
        transparent 1px,
        transparent 20px
      );
      animation: rain-animation 2s linear infinite;
      z-index: 1;
      opacity: 0.5;
    }

    @keyframes rain-animation {
      from { background-position: 0% 0%; }
      to { background-position: 100% 100%; }
    }

    .delivery-image-container {
      position: absolute;
      bottom: 12%;
      left: 50%;
      width: 50vw; /* Using viewport width for responsiveness */
      max-width: 250px; /* Optional: set a max size on large screens */
      height: auto; /* Maintain aspect ratio */
      z-index: 5;
    }

    .delivery-scooter-image {
      width: 100%;
      height: auto;
    }

    .loader-content {
      text-align: left;
      padding: 4rem;
      max-width: 90%;
      z-index: 10;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .loader-counter {
      font-size: clamp(3.5rem, 12vw, 4rem);
      font-weight: 800;
      margin-bottom: 0;
      color: #FF7A3D;
    }

    .loader-text {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
    }

    .loader-text h1 {
      font-size: clamp(3rem, 10vw, 6rem);
      font-weight: 600;
      color: #2C3E50;
      margin: 0;
    }

    .loading-line-wrapper {
      position: relative;
      min-height: clamp(3rem, 10vw, 6rem);
      margin-top: 0.5rem;
    }

    .loading-line {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 600;
      color: #2C3E50;
    }

    .loading-line.toggle-style-1 {
      color: #FF7A3D;
      font-style: italic;
    }

    .loading-line.toggle-style-2 {
      color: #2C3E50;
      font-style: normal;
    }

    .wait-message {
      font-size: 1.2rem;
      color: #6B7280;
      margin-top: 0.5rem;
    }

    .top-line-container {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 0.5rem;
    }

    .loading-line-bar {
      position: absolute;
      bottom: 20%;
      left: 0;
      height: 10px;
      background-color: #FF7A3D;
      z-index: 4;
    }

  `;

  return (
    <>
      <style>{loaderStyles}</style>
      <div className="landing-animation-container">
        <div className="rain-effect" />
        <animated.div style={loadingLineAnimation} className="loading-line-bar" />
        <DeliveryVehicleImage progress={count} isBoosting={isBoosting} />
        <animated.div style={contentAnimation} className="loader-content">
          <div className="top-line-container">
            <div className="loader-counter">{count}%</div>
            <h1>Your order is almost here!</h1>
          </div>
          <div className="loading-line-wrapper">
            <h1 className={`loading-line ${toggleStyle ? 'toggle-style-1' : 'toggle-style-2'}`}>
              Just a moment...
            </h1>
          </div>
          <p className="wait-message">We're finding the best route for your delivery.</p>
        </animated.div>
      </div>
    </>
  );
}
