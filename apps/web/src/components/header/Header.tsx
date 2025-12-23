import HeaderNav from "./HeaderNav";
import HeaderLogo from "./HeaderLogo";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, scale: 0 }}
      animate={{ y: 0, scale: 1 }}
      transition={{
        duration: 1,
        scale: { visualDuration: 0.4, bounce: 0.5 },
      }}
      className="w-full flex justify-between items-center px-6 md:px-40 py-4 bg-foreground/80"
    >
      <HeaderLogo />
      <HeaderNav />
    </motion.header>
  );
}
