import React from 'react';

// Main component export
export default function AdvancedLoader() {
  // State to hold the loading progress counter
  const [count, setCount] = React.useState(0);
  // State to hold the window width for responsive calculations
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  // State to manage the toggling style for the text
  const [toggleStyle, setToggleStyle] = React.useState(false);

  // CSS styles for the loader, defined as a template literal.
  // I've also added the Google Font import for 'Montserrat' here.
  const loaderStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap');

    .landing-animation-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      width: 100%;
      position: relative;
      background-color: #FFF8F0;
      z-index: 1;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
    }
    .loader-content {
      text-align: left;
      max-width: 90%;
      z-index: 3; /* Ensure text is above other elements */
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
    @keyframes loader-fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
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
    @keyframes loader-slide-up {
      from { transform: translateY(100%); }
      to { transform: translateY(0%); }
    }
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
      text-transform: uppercase; /* Keep consistent with other text */
    }
    /* Apply transition to the span inside .loading-line */
    .loading-line span {
      transition: color 0.3s ease-in-out, font-style 0.3s ease-in-out;
    }
    /* Added toggle styles for the span */
    .loading-line .toggle-style-1 {
      color: #FC8019;
      font-style: italic;
    }
    .loading-line .toggle-style-2 {
      color: #2E2E2E;
      font-style: normal;
    }
    .top-line-container {
      display: flex;
      align-items: baseline;
      gap: 1.5rem;
    }
    .scooter-container {
      position: absolute;
      bottom: 10%;
      left: 0;
      width: 150px;
      height: 150px;
      opacity: 0;
      animation: loader-fade-in 0.8s ease-out 0s forwards;
      z-index: 2;
      /* Default transition for smooth movement */
      transition: transform 0.3s linear;
    }
    /* New transition for the boost effect for acceleration/deceleration */
    .scooter-container.boost-active {
      transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    }
    .scooter-png {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `;

  // Effect for the percentage counter
  React.useEffect(() => {
    const targetCount = 100;
    const counterStartTime = 500; // Start after 0.5s
    const counterDuration = 3000; // Complete in 3s
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

      // Cleanup function for the interval
      return () => clearInterval(intervalId);
    }, counterStartTime);

    // Cleanup function for the timeout
    return () => clearTimeout(counterTimeout);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect for toggling the text style
  React.useEffect(() => {
    const styleInterval = setInterval(() => {
      setToggleStyle(prev => !prev);
    }, 500); // Toggles every 500ms
    return () => clearInterval(styleInterval);
  }, []);

  // Effect to listen for window resize events and update the width state
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs only once

  // Calculate the scooter's horizontal position based on the count and current window width
  const scooterTranslateX = ((windowWidth + 150) * count) / 100;

  // Determine if the scooter should be in its "boost" state
  const isBoosting = count >= 20 && count <= 70;

  return (
    <>
      <style>{loaderStyles}</style>
      <div className="landing-animation-container">
        <div className="loader-content">
          <div className="loader-text">
            <div className="top-line-container">
              <div className="loader-counter">
                <span>{count}</span>%
              </div>
              <div className="h1-wrapper"><h1>YOUR ORDER IS PLACED</h1></div>
            </div>
            <div className="h1-wrapper"><h1>THE KITCHEN IS COOKING</h1></div>
            <div className="loading-line-wrapper">
              <h1 className="loading-line">
                Your rider is on the <span className={`${toggleStyle ? 'toggle-style-1' : 'toggle-style-2'}`}>move</span>
              </h1>
            </div>
          </div>
        </div>

        {/* The scooter element that moves across the screen */}
        <div
          // The 'boost-active' class is conditionally applied here
          className={`scooter-container ${isBoosting ? 'boost-active' : ''}`}
          style={{ transform: `translateX(${scooterTranslateX - 150}px)` }}
        >
          <img
            className="scooter-png"
            src="/del.png"
            alt="Scooter delivering food"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/150x150/FFF8F0/FC8019?text=Error'; }}
          />
        </div>
      </div>
    </>
  );
};
