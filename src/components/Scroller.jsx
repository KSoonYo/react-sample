import { useState, useRef, useEffect } from "react";
import styles from './Scroller.module.css';
/**
 * auto hightlighting + auto scrolling
 */
const Scroller = () => {
  const data = 'Austria.Alfred Offner (1879-1937).Draw war loan.1918.No product has been advertised as those, to subscribe war bonds.Graphic designers developed in all countries the essential elements of modern advertising psychology.This involved the use of child images.In addition, Alfred Offner also appointed an text part as a graphic element.The upper part of the "Eight" fills the view of a child laying a coin with a serious facial expression.The hand of the child connects the image parts.If the child should draw attention here merely, it was customary to gather in schools and clubs, even the smallest contributions of children to war bonds.'
  const stringArr = data.split('.').filter((string) => string !== '');

  const scrollerContainerRef = useRef(null);
  const [targetElemIdx, setTargetElemIdx] = useState(0);

  useEffect(() => {
    const scrollerContainer = scrollerContainerRef.current;
    
    const handleScroll = () => {
      if (scrollerContainer) {
        const scrollPosition = scrollerContainer.scrollTop;
        const containerHeight = scrollerContainer.clientHeight;
        const targetElement = scrollerContainer.querySelector(`[data-id="${targetElemIdx}"]`);

        if (targetElement) {
          const targetPosition = targetElement.offsetTop;
          const targetHeight = targetElement.offsetHeight;
          const targetBottomPosition = targetPosition + targetHeight;
          
          if (scrollPosition + containerHeight < targetBottomPosition) {
            scrollerContainer.scrollTo(0, targetBottomPosition - containerHeight);
          }
        }
      }
    };

    
    handleScroll();
    
    if(targetElemIdx < stringArr.length){
      const intervalId = setInterval(() => {
        setTargetElemIdx((prev) => prev + 1);
      }, 1000)
      return () => {
        clearInterval(intervalId);
      }
    }
  }, [targetElemIdx, stringArr]);

  return (
    <div ref={scrollerContainerRef} className={styles.container}>
      <ul>
        {stringArr.map((string, idx) => {
          return (
            <p key={idx} data-id={idx} className={targetElemIdx === idx ? `${styles.targetElement}` : ''}>
              <span>{string}</span>
            </p>
          );
        })}
      </ul>
    </div>
  );
}

export default Scroller;
