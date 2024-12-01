import React, { useState, useRef } from 'react';
import styles from './App.module.css';

interface ImageProps {
  defaultWidth?: number;
  asciiChars?: string;
}

const DEFAULT_ASCII_CHARS = '@%#*+=-:. ';
const DEFAULT_WIDTH = 120;

const App: React.FC<ImageProps> = ({
  defaultWidth = DEFAULT_WIDTH,
  asciiChars = DEFAULT_ASCII_CHARS,
}) => {
  const [asciiArt, setAsciiArt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convertToAscii = (imageElement: HTMLImageElement, width: number): string => {
    const canvas = canvasRef.current;
    if (!canvas) return '';
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';
    
    const CHAR_WIDTH = 10;
    const CHAR_HEIGHT = 18;
    
    const aspectRatio = imageElement.height / imageElement.width;
    const height = Math.floor(width * aspectRatio * (CHAR_WIDTH / CHAR_HEIGHT));
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(imageElement, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    
    let result = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const offset = (y * width + x) * 4;
        const r = imageData.data[offset];
        const g = imageData.data[offset + 1];
        const b = imageData.data[offset + 2];
        const brightness = (r + g + b) / 3;
        
        const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
        result += asciiChars[charIndex];
      }
      result += '\n';
    }
    return result;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ascii = convertToAscii(img, defaultWidth);
        setAsciiArt(ascii);
      };
      img.src = e.target?.result as string;
      setImageUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className={styles.fileInput}
      />
      
      <canvas ref={canvasRef} className={styles.hiddenCanvas} />
      
      <div className={styles.contentWrapper}>
        {imageUrl && (
          <div className={styles.imageContainer}>
            <img 
              src={imageUrl} 
              alt="Uploaded image" 
              className={styles.uploadedImage}
            />
          </div>
        )}
        
        {asciiArt && (
          <pre className={styles.asciiOutput}>
            {asciiArt}
          </pre>
        )}
      </div>
    </div>
  );
};

export default App;