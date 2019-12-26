import React from 'react'
import { motion } from 'framer-motion'

const transition = {
  duration: 0.15,
  ease: [0.43, 0.13, 0.23, 0.96]
}

const Stack: React.FC<{
  state?: {
    back: boolean
  }
}> = props => {
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
          scale: 1,
          x: 0
        },
        initial: {
          opacity: 0.0,
          transition,
          scale: 0.9,
          x: 400
        },
        exit: {
          opacity: 0.0,
          transition,
          scale: 0.9,
          x: -400
        }
      }}
    >
      {children}
    </motion.div>
  )
}

export default Stack
