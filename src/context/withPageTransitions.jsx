import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "100%",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "-100%",
  },
};

const withPageTransition = (WrappedComponent) => {
  const WithPageTransition = (props) => {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={{
          duration: 0.5,
          when: "beforeChildren",
        }}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };

  WithPageTransition.displayName = `withPageTransition(${getDisplayName(
    WrappedComponent
  )})`;

  return WithPageTransition;
};

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withPageTransition;
