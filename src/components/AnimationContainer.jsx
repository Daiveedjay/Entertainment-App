/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const AnimationContainer = ({ children }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
};

export default AnimationContainer;
