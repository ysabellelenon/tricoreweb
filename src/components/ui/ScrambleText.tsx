"use client";

import { useState, useEffect, useRef } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const ScrambleText = ({ text, className = '', style }: ScrambleTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  useEffect(() => {
    if (isHovering) {
      let iteration = 0;
      const maxIterations = text.length;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1 / 5;

        if (iteration >= maxIterations) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setDisplayText(text);
        }
      }, 20);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      setDisplayText(text);
    }
  }, [isHovering, text]);

  return (
    <span
      className={className}
      style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </span>
  );
};

export default ScrambleText;

