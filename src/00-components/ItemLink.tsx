import React from 'react'
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
// import { ChevronRight } from 'react-feather'

const List = styled(Link)`
  display: block;
  user-select: none;
  position: relative;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  background-color: white;
`;

// const Icon = styled(ChevronRight)`
//   position: absolute;
//   right: 16px;
//   top: 13px;
// `

const ItemLink: React.FC<{
  to: string;
}> = ({ children, to }) => {
  return (
    <List to={to}>
      {children}
      {/* <Icon
        size={24}
        color="#999"
        style={{
          transition: 'transform .15s'
        }}
      /> */}
    </List>
  );
};

export default ItemLink
