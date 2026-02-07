import { useEffect } from 'react';

const useScrollToTop = () => {
  useEffect(() => {
    const scrollToTop = () => {
      // Multiple methods to ensure scroll to top works across different browsers
      try {
        // Method 1: Smooth scroll with options
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        
        // Method 2: Immediate scroll as fallback
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 50);
        
        // Method 3: Direct element manipulation
        setTimeout(() => {
          if (document.documentElement) {
            document.documentElement.scrollTop = 0;
          }
          if (document.body) {
            document.body.scrollTop = 0;
          }
        }, 100);
        
        // Method 4: Force scroll after all content loads
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 200);
        
      } catch (error) {
        // Fallback for older browsers or errors
        window.scrollTo(0, 0);
      }
    };

    // Execute immediately
    scrollToTop();
    
    // Also execute on window load event
    const handleLoad = () => {
      scrollToTop();
    };
    
    // Listen for load event
    window.addEventListener('load', handleLoad);
    
    // Also execute after a longer delay to catch any dynamic content
    const timeoutId = setTimeout(scrollToTop, 500);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, []);
};

export default useScrollToTop; 