import { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaArrowUp, FaArrowDown, FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

// Sample content data - replace with your actual content
const contentItems = [
  {
    id: 1,
    type: "video",
    src: "/content/sample1.mp4",
  },
  {
    id: 2,
    type: "image",
    src: "/content/sample2.png",
  },
  {
    id: 4,
    type: "image",
    src: "/content/sample4.png",
  }
];

function Content() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const currentContent = contentItems[currentIndex];

  // Effect to handle video play/pause
  useEffect(() => {
    if (currentContent.type === 'video' && videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(error => {
          console.log("Auto-play was prevented:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentContent]);

  // Effect to handle video mute/unmute
  useEffect(() => {
    if (currentContent.type === 'video' && videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, currentContent]);

  // Effect to reset play state when content changes
  useEffect(() => {
    setIsPlaying(true);
  }, [currentIndex]);

  const navigateUp = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : contentItems.length - 1));
  };

  const navigateDown = () => {
    setCurrentIndex(prev => (prev < contentItems.length - 1 ? prev + 1 : 0));
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      navigateUp();
    } else if (e.key === 'ArrowDown') {
      navigateDown();
    } else if (e.key === ' ') {
      togglePlay();
      e.preventDefault(); // Prevent space from scrolling the page
    } else if (e.key === 'm') {
      toggleMute();
    }
  };

  return (
    <div className="wrapper content-wrapper" onKeyDown={handleKeyDown} tabIndex={0}>
      <Header />
      
      <main className="content-main">
        <div className="content-container">
          <div className="content-display">
            {currentContent.type === 'video' ? (
              <video
                ref={videoRef}
                key={currentContent.id}
                src={currentContent.src}
                className="content-media"
                autoPlay
                muted={isMuted}
                loop
                playsInline
              />
            ) : (
              <img
                key={currentContent.id}
                src={currentContent.src}
                alt={currentContent.title || currentContent.description}
                className="content-media"
              />
            )}
            
            {/* Content overlay with controls */}
            <div className="content-overlay">
              <div className="content-info">
                {currentContent.title && (
                  <h2 className="content-title">{currentContent.title}</h2>
                )}
                <p className="content-description">{currentContent.description}</p>
              </div>
              
              <div className="content-controls">
                {currentContent.type === 'video' && (
                  <>
                    <button 
                      className="control-btn" 
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button 
                      className="control-btn" 
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation arrows on the right side */}
          <div className="content-navigation-right">
            <button 
              className="nav-arrow nav-arrow-up"
              onClick={navigateUp}
              aria-label="Previous content"
            >
              <FaArrowUp />
            </button>
            
            <div className="content-counter">
              {currentIndex + 1} / {contentItems.length}
            </div>
            
            <button 
              className="nav-arrow nav-arrow-down"
              onClick={navigateDown}
              aria-label="Next content"
            >
              <FaArrowDown />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Content;