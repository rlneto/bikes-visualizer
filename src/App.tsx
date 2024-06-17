import React, { useState, useEffect, useCallback } from 'react';

const App: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const centerImage = '007_007.jpg';
  const imagePath = '/bikes/';
  const imageSize = 100; // Assuming each image is 100x100 pixels

  useEffect(() => {
    loadImage(centerImage);
    preloadImages();
  }, []);

  const loadImage = useCallback((imageName: string) => {
    const cachedImage = localStorage.getItem(imageName);
    if (cachedImage) {
      setImage(cachedImage);
    } else {
      const imageUrl = `${imagePath}${imageName}`;
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          localStorage.setItem(imageName, url);
          setImage(url);
        })
        .catch(error => {
          console.error('Error loading image:', error);
        });
    }
  }, []);

  const preloadImages = () => {
    for (let i = 0; i <= 14; i++) {
      for (let j = 0; j <= 14; j++) {
        const imageName = `${i.toString().padStart(3, '0')}_${j.toString().padStart(3, '0')}.jpg`;
        if (!localStorage.getItem(imageName)) {
          const imageUrl = `${imagePath}${imageName}`;
          fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
              const url = URL.createObjectURL(blob);
              localStorage.setItem(imageName, url);
            })
            .catch(error => {
              console.error('Error preloading image:', error);
            });
        }
      }
    }
  };

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
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh', overflow: 'hidden', margin: 'auto' }}
    >
      {image && <img src={image} alt="Matrix View" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.src = '/path/to/fallback/image.jpg'; }} />}
    </div>
  );
};

export default App;
