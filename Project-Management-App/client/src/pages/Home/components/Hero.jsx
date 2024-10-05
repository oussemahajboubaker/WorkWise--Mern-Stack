import React from 'react';
import styled from 'styled-components';
import HeaderImage from "../../../Images/Header.png";

const Container = styled.div`
  height: 90vh;
  margin: 20px;
  max-width: 1320px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background: linear-gradient(135deg, #1a1a2e 30%, #16213e 90%);
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    height: auto;
    padding: 20px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

const TitleTag = styled.h1`
  font-size: 64px;
  color: #f5f5f5;
  line-height: 1.2;
  font-weight: 900;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const DescriptiveTag = styled.p`
  font-size: 18px;
  line-height: 1.7;
  color: #d1d1d1;
  max-width: 600px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  padding: 16px 32px;
  font-size: 18px;
  background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 24px rgba(255, 81, 47, 0.6);
  }

  @media (max-width: 768px) {
    width: 100%;
    font-size: 16px;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const Image = styled.img`
  width: 500px;
  height: auto;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const Hero = ({ setSignInOpen }) => {
  return (
    <Container id="home">
      <ImageWrapper>
        <Image src={HeaderImage} alt="Project Management App" />
      </ImageWrapper>
      <Left>
        <TitleTag>Boost Your Projects</TitleTag>
        <DescriptiveTag>
          Simplify project management and achieve your goals effortlessly with our powerful app. Experience better organization, enhanced productivity, and seamless teamwork.
        </DescriptiveTag>
        <Button onClick={() => setSignInOpen(true)}>Start Managing Projects</Button>
      </Left>
    </Container>
  );
};

export default Hero;
