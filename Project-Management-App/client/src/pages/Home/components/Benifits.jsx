import React from 'react';
import styled from 'styled-components';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HeroBgAnimation from '../components/HeroBgAnimation';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const FeaturesWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(circle, rgba(20, 30, 48, 1) 0%, rgba(36, 59, 85, 1) 100%);
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 300px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.2);
    filter: blur(150px);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    right: -150px;
    width: 400px;
    height: 400px;
    background-color: rgba(255, 255, 255, 0.1);
    filter: blur(200px);
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    padding-bottom: 80px;
  }
`;

const Number = styled.div`
  width: 120px;
  height: 120px;
  font-size: 50px;
  font-weight: 900;
  color: #ffffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #e9c46a, #e76f51);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.2) rotate(10deg);
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
    font-size: 36px;
  }
`;

const FeaturesTitle = styled.div`
  font-size: 62px;
  font-weight: 800;
  text-align: center;
  color: #ffffff;
  margin-bottom: 25px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 48px;
  }
`;

const FeatureDescription = styled.p`
  font-size: 22px;
  line-height: 1.8;
  font-weight: 400;
  color: #f0f0f0;
  max-width: 800px;
  text-align: center;
  margin-bottom: 60px;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 40px;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
`;

const FeatureCard = ({ title, description, icon }) => (
  <Card>
    <div style={{ flex: 1 }}>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureCardDescription>{description}</FeatureCardDescription>
    </div>
    <FeatureIcon>{icon}</FeatureIcon>
  </Card>
);

const Card = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  backdrop-filter: blur(10px);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: rgba(255, 255, 255, 0.3) 0px 10px 40px;
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

const FeatureIcon = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e76f51, #f4a261);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #f4a261, #e76f51);
  }

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const FeatureTitle = styled.div`
  font-size: 24px;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 10px;
  text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);
`;

const FeatureCardDescription = styled.div`
  font-size: 18px;
  color: #dcdcdc;
  line-height: 1.8;
`;

const BgImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  opacity: 0.1;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  position: relative;
`;

const featuresData = [
  { icon: <TrendingUpIcon />, title: 'Augmentez la productivité', description: 'Restez au sommet des tâches et des délais avec nos outils de gestion de projets faciles à utiliser.' },
  { icon: <ForumIcon />, title: 'Collaboration efficace', description: 'Facilitez la communication et la collaboration avec les membres de l\'équipe sans effort.' },
  { icon: <CheckCircleOutlineIcon />, title: 'Obtenez des résultats', description: 'Fixez et suivez des objectifs pour assurer le succès du projet avec clarté et précision.' },
  { icon: <Diversity3Icon />, title: 'Développez votre réseau', description: 'Connectez-vous avec des professionnels partageant les mêmes idées et développez votre expertise.' }
];

const Benefits = () => {
  return (
    <FeaturesWrapper id="benefits">
      <Number>2</Number>
      <FeaturesTitle>Pourquoi nous choisir</FeaturesTitle>
      <FeatureDescription>Notre application offre une gamme de fonctionnalités conçues pour vous aider à gérer les projets avec facilité et efficacité, que ce soit pour un usage personnel ou en équipe.</FeatureDescription>
      <Content>
        <FeaturesContainer>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </FeaturesContainer>
        <BgImage>
          <HeroBgAnimation />
        </BgImage>
      </Content>
    </FeaturesWrapper>
  );
};

export default Benefits;
