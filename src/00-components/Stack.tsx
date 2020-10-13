import React from 'react'
import { motion } from 'framer-motion'

const transition = {
  duration: 0.2,
  ease: [0.43, 0.13, 0.23, 0.96],
}

const Stack: React.FC<{
  state?: {
    back: boolean
  }
}> = (props) => {
  const { children, state } = props

  return (
    <motion.div
      exit={state && state.back ? 'exit' : 'initial'}
      initial={state && state.back ? 'exit' : 'initial'}
      animate="enter"
      variants={{
        enter: {
          opacity: 1,
          transition,
          x: 0,
        },
        initial: {
          opacity: 0.0,
          transition,
          x: 400,
        },
        exit: {
          opacity: 0.0,
          transition,
          x: -400,
        },
      }}
      style={{
        height: '100vh',
      }}
    >
      {children}
    </motion.div>
  )
}

export default Stack
