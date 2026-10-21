import React from "react";
import { AnimatePresence, motion } from "motion/react";

const BillingDrawer = ({ open, onClose }) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {" "}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div></motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BillingDrawer;
