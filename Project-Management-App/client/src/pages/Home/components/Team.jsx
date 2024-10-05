import React from "react";
import styled from "styled-components";
import TeamMember from "./TeamMember";

const TeamWrapper = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0px 100px 0px;   
  background: radial-gradient(circle, rgba(20, 30, 48, 1) 0%, rgba(36, 59, 85, 1) 100%);
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 95%, 0 100%);
`;


const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  max-width: 1200px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Team = () => {
  const member = [{
    photo: "https://scontent.ftun1-2.fna.fbcdn.net/v/t39.30808-6/420690782_412562024838148_6454372516050007484_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=CfwN05BdoIUQ7kNvgED6uoe&_nc_ht=scontent.ftun1-2.fna&oh=00_AYArOnXXG9Eebjfb-oTpJuvf7x9QkFyVqNUpTkhaEQKVtg&oe=6649B4B0",
    name: "OUSSEMA HAJ BOUBAKER",
    title: "MDW 2.1",
    bio: "Je suis spécialisé dans le développement web full-stack, le développement d'applications Android et le développement avec la stack MERN. Je maîtrise divers langages de programmation, frameworks et technologies, et je m'efforce de créer des applications de haute qualité et conviviales."
  }];

  return (
    <TeamWrapper id="team">
      
      <TeamContainer>
        {member.map((membre, index) => (
          <TeamMember key={index} photo={membre.photo} name={membre.name} title={membre.title} bio={membre.bio} />
        ))}
      </TeamContainer>
    </TeamWrapper>
  );
};

export default Team;
