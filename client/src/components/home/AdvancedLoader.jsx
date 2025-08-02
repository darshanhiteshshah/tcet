import React, { useState, useEffect } from 'react';

const loaderStyles = `
  .landing-animation-container {
    display: flex; justify-content: center; align-items: center;
    height: 100vh; width: 100%; position: relative;
    background-color: #FFF8F0;
    z-index: 1;
    font-family: 'Montserrat', sans-serif;
    overflow: hidden;
  }
  .loader-content { text-align: left; max-width: 90%; }
  .loader-counter {
    font-size: 1.8rem; font-weight: 400; margin-bottom: 1.5rem;
    color: #2E2E2E;
    opacity: 0; animation: loader-fade-in 0.8s ease-out 0.2s forwards;
  }
  @keyframes loader-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .h1-wrapper { overflow: hidden; line-height: 1.1; }
  .loader-text h1 {
    font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 800; text-transform: uppercase;
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
    position: relative; min-height: clamp(2.5rem, 8vw, 5rem);
    height: auto;
    opacity: 0;
    animation: loader-fade-in 0.8s ease-out 1.5s forwards;
  }
  .loading-line {
    position: relative; white-space: normal;
    color: #2E2E2E;
  }
  .loading-line .outline {
    display: inline-block;
    animation: toggle-now-style 0.7s step-end 1.5s infinite;
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
  .wait-message {
    font-size: 0.95rem;
    color: #FC8019;
    margin-top: 3rem;
    opacity: 0;
    animation: loader-fade-in 0.8s ease-out 1.8s forwards;
  }
  .top-line-container {
    display: flex; align-items: baseline; gap: 1.5rem;
  }
`;

const AdvancedLoader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const targetCount = 100;
    const counterStartTime = 1500;
    const counterDuration = 2000;
    const counterIntervalTime = counterDuration / targetCount;

    const counterTimeout = setTimeout(() => {
      const intervalId = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < targetCount) return prevCount + 1;
          clearInterval(intervalId);
          return targetCount;
        });
      }, counterIntervalTime);

      return () => clearInterval(intervalId);
    }, counterStartTime);

    return () => clearTimeout(counterTimeout);
  }, []);

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
};

export default AdvancedLoader;