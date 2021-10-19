import React from "react";
import styled from "styled-components";
import { AiFillGithub } from "react-icons/ai";

const SubFooterTitle = styled.div`
  background: #5ebfb8;
  color: #fff;
  padding: 4px;
  text-align: center;

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 20px;
  }
`;

const FooterCopyright = styled.div`
  background: #f35f70;
  color: #fff;
  text-align: center;
  padding: 30px 0 30px;
`;

export default function Footer() {
  return (
    <>
      <SubFooterTitle>
        <a href="https://github.com/roroiii" target="_blank" rel="noreferrer">
          <AiFillGithub />
        </a>
      </SubFooterTitle>
      <FooterCopyright>Copyright © 2021 TASTE OF SUMMER</FooterCopyright>
    </>
  );
}
