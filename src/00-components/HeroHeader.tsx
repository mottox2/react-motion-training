import React from 'react'
import styled from '@emotion/styled/macro'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Hero = styled.header`
  padding: 200px 16px 16px;
  background-color: #3799de;
  color: white;
  user-select: none;
`

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
`

const Description = styled.h1`
  font-size: 16px;
  opacity: 0.8;
  margin-top: 2px;
`

const Back = styled(motion.span)`
  position: fixed;
  top: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  user-select: none;
`

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 10px 20px;
  color: inherit;
`

const HeroHeader: React.FC<{
  title: string
  description: string
  color: string
}> = ({ title, description, color }) => {
  return (
    <>
      <Back whileTap={{ scale: 0.9 }}>
        <StyledLink to="/">Back</StyledLink>
      </Back>
      <Hero
        style={{
          backgroundColor: color
        }}
      >
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Hero>
    </>
  )
}

export default HeroHeader
