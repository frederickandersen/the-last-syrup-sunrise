import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useDragControls } from 'framer-motion';

interface CarouselProps {
  items: React.ReactNode[];
  title: string;
  titleColor: string;
  rightElement?: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ items, title, titleColor, rightElement }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [containerHeight, setContainerHeight] = useState(0);
  const dragControls = useDragControls();
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        const height = contentRef.current.offsetHeight;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [currentIndex]);

  const next = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const previous = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50;
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        previous();
      } else {
        next();
      }
    }
    x.set(0);
  };

  const slideVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'left' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: 'left' | 'right') => ({
      zIndex: 0,
      x: direction === 'left' ? '-100%' : '100%',
      opacity: 0
    })
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className={`text-2xl md:text-3xl font-display font-bold uppercase tracking-wider ${titleColor}`}>
          {title}
        </h2>
        {rightElement}
      </div>
      
      <div className="relative overflow-hidden" style={{ height: containerHeight || '424px' }}>
        <motion.div
          drag="x"
          dragControls={dragControls}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ x, opacity }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 400, damping: 30, mass: 0.5 },
                opacity: { duration: 0.15 }
              }}
              className="absolute w-full h-full"
            >
              <div ref={contentRef}>
                {items[currentIndex]}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'left' : 'right');
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-disco-neon-blue' : 'bg-disco-dark-card'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 