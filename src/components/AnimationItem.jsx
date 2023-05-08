/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const AnimationItem = ({ children }) => {
  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return <motion.div variants={item}>{children}</motion.div>;
};

export default AnimationItem;
