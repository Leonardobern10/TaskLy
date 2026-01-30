import HeaderNav from "./HeaderNav";
import HeaderLogo from "./HeaderLogo";
import { motion } from "motion/react";

const style = {
  header:
    "w-full flex justify-between items-center px-6 md:px-25 py-4 bg-background/80 border-b",
};

const headerOptions = {
  initial: { y: -100, scale: 0 },
  animate: { y: 0, scale: 1 },
  transition: {
    duration: 1,
    scale: { visualDuration: 0.4, bounce: 0.5 },
  },
  className: style.header,
};

export default function Header() {
  return (
    <motion.header {...headerOptions}>
      <HeaderLogo />
      <HeaderNav />
    </motion.header>
  );
}
