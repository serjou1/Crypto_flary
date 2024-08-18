import React, { useRef, useEffect, useState } from 'react';
import style from './Giveaway.module.scss'

const IframeScrollHandler = ({ src, ...props }) => {
  const iframeRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleWheel = (event) => {
      if (isHovering) {
        window.scrollBy(0, event.deltaY);
        event.preventDefault();
      }
    };

    if (iframe) {
      iframe.addEventListener('mouseenter', handleMouseEnter);
      iframe.addEventListener('mouseleave', handleMouseLeave);
    }

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (iframe) {
        iframe.removeEventListener('mouseenter', handleMouseEnter);
        iframe.removeEventListener('mouseleave', handleMouseLeave);
      }
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isHovering]);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      {...props}
      style={{  height: '100%', ...props.style }}
      className={style.iframe}
    />
  );
};

export default IframeScrollHandler;
