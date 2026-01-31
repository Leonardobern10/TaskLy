export const optionsAnimate = {
  variants: {
    containerVariants: {
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12, // intervalo entre os elementos
          delayChildren: 0.1, // atraso inicial (opcional)
        },
      },
    },
    itemVariants: {
      hidden: {
        opacity: 0,
        y: 12,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          easing: "ease",
        },
      },
    },
  },
};

export const optionsAnimateDashboardTop = (initial: number) => ({
  initial: { x: initial },
  animate: { x: 0 },
  transition: {
    duration: 1,
  },
});
