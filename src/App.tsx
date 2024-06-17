import React, { useState, useEffect, useCallback } from 'react';

const App: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const centerImage = '007_007.jpg';
  const imagePath = '/bikes/';
  const imageSize = 100;

  useEffect(() => {
    loadImage(centerImage);
  }, []);

  const loadImage = useCallback((imageName: string) => {
    const imageUrl = `${imagePath}${imageName}`;
    setImage(imageUrl);
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      const { clientX, clientY } = event;
      const i = Math.min(Math.max(Math.floor(clientX / imageSize), 0), 14).toString().padStart(3, '0');
      const j = Math.min(Math.max(Math.floor(clientY / imageSize), 0), 14).toString().padStart(3, '0');
      const imageName = `${i}_${j}.jpg`;
      loadImage(imageName);
    }
  }, [isMouseDown, loadImage]);

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ width: `${imageSize * 15}px`, height: `${imageSize * 15}px`, overflow: 'hidden', margin: 'auto' }}
    >
      {image && <img src={image} alt="Matrix View" style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = '/path/to/fallback/image.jpg'; }} />}
    </div>
  );
};

export default App;
