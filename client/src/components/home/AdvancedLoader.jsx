// FILE: src/components/home/AdvancedLoader.jsx
// This is your loader component, now acting as the main landing animation.
// I've removed the onLoadingComplete logic as it's no longer needed.

import React, { useState, useEffect } from 'react';

// Inline CSS for the component to keep it self-contained
const loaderStyles = `
    .landing-animation-container {
        display: flex; justify-content: center; align-items: center;
        height: 100vh; width: 100%; position: relative;
        background-color: #000; z-index: 1;
        font-family: 'Montserrat', sans-serif;
        overflow: hidden;
    }
    .loader-content { text-align: left; max-width: 90%; }
    .loader-counter {
        font-size: 1.8rem; font-weight: 400; margin-bottom: 1.5rem; color: #e0e0e0;
        opacity: 0; animation: loader-fade-in 0.8s ease-out 0.2s forwards;
    }
    @keyframes loader-fade-in { from { opacity: 0; } to { opacity: 1; } }
    .h1-wrapper { overflow: hidden; line-height: 1.1; }
    .loader-text h1 {
        font-size: clamp(2.5rem, 8vw, 5rem); font-weight: 700; text-transform: uppercase;
        color: #e0e0e0; margin: 0; transform: translateY(100%);
        animation: loader-slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }
    .h1-wrapper:nth-of-type(1) h1 { animation-delay: 0.5s; }
    .h1-wrapper:nth-of-type(2) h1 { animation-delay: 1.0s; }
    @keyframes loader-slide-up { from { transform: translateY(100%); } to { transform: translateY(0%); } }
    .loading-line-wrapper {
        position: relative; min-height: clamp(2.5rem, 8vw, 5rem); height: auto;
        opacity: 0;
        animation: loader-fade-in 0.8s ease-out 1.5s forwards;
    }
    .loading-line { position: relative; white-space: normal; }
    .loading-line .outline {
        display: inline-block; animation: toggle-now-style 1s step-end 1.5s infinite;
    }
    @keyframes toggle-now-style {
        0%, 49.9% { color: #e0e0e0; -webkit-text-stroke: 0; font-weight: 700; font-style: normal; }
        50%, 100% { color: transparent; -webkit-text-stroke: 1px #e0e0e0; font-weight: 400; font-style: italic; }
    }
    .wait-message {
        font-size: 0.9rem; color: #ccc; margin-top: 3rem; opacity: 0;
        animation: loader-fade-in 0.8s ease-out 1.8s forwards;
    }
    .top-line-container { display: flex; align-items: baseline; gap: 1.5rem; }
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
             // Cleanup interval on component unmount
            return () => clearInterval(intervalId);
        }, counterStartTime);

        // Cleanup timeout on component unmount
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
                                <span>{count}</span> - 100
                            </div>
                            <div className="h1-wrapper"><h1>YOUR</h1></div>
                        </div>
                        <div className="h1-wrapper"><h1>WEB EXPERIENCE</h1></div>
                        <div className="loading-line-wrapper">
                            <h1 className="loading-line">IS LOADING RIGHT <span className="outline">NOW</span></h1>
                        </div>
                    </div>
                    <div className="wait-message">
                        <p>please wait</p>
                        <p>a few seconds</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default AdvancedLoader;