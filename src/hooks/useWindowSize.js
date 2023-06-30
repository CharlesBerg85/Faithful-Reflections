import { useState, useEffect } from 'react';

// Custom hook for getting the window size
const useWindowSize = () => {
  // Initialize state for window size
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    // Event handler function for window resize event
    const handleResize = () => {
      // Update the window size state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Add event listener for window resize event
    window.addEventListener("resize", handleResize);
    
    // Call handleResize to set initial window size
    handleResize();

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  // Return the window size
  return windowSize;
};

export default useWindowSize;
