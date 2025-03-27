import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleYesClick = () => {
    setShowMessage(true);
  };

  const handleMouseMove = (e) => {
    const button = e.target;
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate distance from mouse to button center
    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;
    
    // Calculate the current distance from cursor to button
    const currentDistance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // Target distance in pixels (1.5 inches ≈ 144 pixels at 96 DPI)
    const targetDistance = 144;
    
    // Calculate the ratio to maintain constant distance
    const ratio = targetDistance / currentDistance;
    
    // Calculate new position to maintain constant distance
    let newX = e.clientX + distanceX * ratio;
    let newY = e.clientY + distanceY * ratio;
    
    // Keep button within window bounds
    newX = Math.max(0, Math.min(newX, windowSize.width - buttonRect.width));
    newY = Math.max(0, Math.min(newY, windowSize.height - buttonRect.height));
    
    setButtonPosition({ x: newX, y: newY });
  };

  return (
    <div className="App">
      <h1>Is Usama cute and funny?</h1>
      <div className="buttons-wrapper">
        <button onClick={handleYesClick} className="yes-button">
          Yes
        </button>
        <button
          className="no-button"
          style={{
            position: 'fixed',
            left: buttonPosition.x,
            top: buttonPosition.y,
          }}
          onMouseMove={handleMouseMove}
        >
          No
        </button>
      </div>
      {showMessage && (
        <div className="message">
          Awwwww I knew it but thanks so sweet ❤️
        </div>
      )}
    </div>
  );
}

export default App; 