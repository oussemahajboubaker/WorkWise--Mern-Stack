import { IconButton, Modal, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import {
  Block,
  CloseRounded,
  EmailRounded,
  Visibility,
  VisibilityOff,
  PasswordRounded,
  TroubleshootRounded,
  SendRounded,
  SearchOutlined,
} from "@mui/icons-material";
import { tools } from "../data/data";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  inviteProjectMembers,
  inviteTeamMembers,
  searchUsers,
  createTeam
} from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import ImageSelector from "./ImageSelector";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(50, 50, 50, 0.9); /* Fond gris foncé avec transparence */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  height: min-content;
  margin: 2%;
  max-width: 600px;
  border-radius: 16px;
  background-color: #333; /* Gris foncé */
  color: #f0f0f0; /* Couleur du texte clair */
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* Ombre pour plus de profondeur */
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #f0f0f0; /* Texte clair */
  margin: 16px 0;
  text-align: center; /* Centrage du texte pour un effet moderne */
`;

const Desc = styled.textarea`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 8px;
  background-color: #444; /* Gris plus clair pour le champ de texte */
  padding: 12px;
  color: #e0e0e0; /* Texte plus doux */
  margin-bottom: 12px;
  resize: none; /* Désactivation du redimensionnement */
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0; /* Texte plus doux */
  margin-bottom: 8px;
`;

const OutlinedBox = styled.div`
  min-height: 48px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 14px;
  margin: 8px 0;
  
  ${({ googleButton }) =>
    googleButton &&
    `
    gap: 16px;
    background-color: #555; /* Gris plus clair pour les boutons Google */
    color: #fff;
  `}
  
  ${({ button }) =>
    button &&
    `
    font-weight: bold;
    background-color: #f05a28; /* Bouton orange vif */
    color: white;
    transition: all 0.3s ease;
    &:hover {
      background-color: #ff7633; /* Effet hover plus lumineux */
    }
  `}
  
  ${({ activeButton }) =>
    activeButton &&
    `
    background-color: #ff7633; /* Bouton actif orange plus vif */
    color: white;
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin: 12px 0;
  justify-content: space-between;
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 8px;
  background-color: #444;
  padding: 12px;
  color: #e0e0e0;
  margin-bottom: 12px;
`;

const ToolsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 12px;
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 8px;
`;

const AddMember = styled.div`
  padding: 12px;
  border-radius: 8px;
  background-color: #3a3a3a; /* Gris foncé transparent */
  margin-top: 20px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  background-color: #444;
  color: #e0e0e0;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 100px;
  background-color: transparent;
  outline: none;
  color: #e0e0e0;
`;

const UsersList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 16px;
  background-color: #333;
  color: #e0e0e0;
`;

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: #444;
  border-radius: 12px;
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #e0e0e0;
`;

const EmailId = styled.div`
  font-size: 12px;
  color: #b0b0b0;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Access = styled.div`
  padding: 8px 12px;
  border-radius: 12px;
  background-color: #555;
  font-size: 12px;
  color: #e0e0e0;
`;

const Select = styled.select`
  border: none;
  font-size: 12px;
  background-color: #555;
  color: #e0e0e0;
  padding: 8px;
  border-radius: 8px;
`;

const Role = styled.div`
  background-color: #555;
  padding: 8px;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InviteButton = styled.button`
  padding: 10px 16px;
  background-color: transparent;
  border: 2px solid #f05a28; /* Bordure orange */
  color: #f05a28;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #f05a28;
    color: white;
  }
`;


const AddNewTeam = ({ setNewTeam }) => {
  const [Loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [backDisabled, setBackDisabled] = useState(false);

  const [showAddTeam, setShowAddTeam] = useState(true);
  const [showTools, setShowTools] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const token = localStorage.getItem("token");

  const goToAddTeam = () => {
    setShowAddTeam(true);
    setShowTools(false);
    setShowAddMember(false);
  };

  const goToAddTools = () => {
    setShowAddTeam(false);
    setShowAddMember(false);
    setShowTools(true);
  };

  const goToAddMember = () => {
    setShowAddTeam(false);
    setShowTools(false);
    setShowAddMember(true);
  };

  //add member part

  const [search, setSearch] = React.useState("");
  const [users, setUsers] = React.useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [role, setRole] = useState("");
  const [access, setAccess] = useState("");
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [inputs, setInputs] = useState({img:"", name: "", desc: "" });

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    searchUsers(e.target.value, token)
      .then((res) => {
        if (res.status === 200) {
          setUsers(res.data);
        }
        else {
          setUsers([]);
        }
      })
      .catch((err) => {
        setUsers([]);
      });
  };

  const handleSelect = (user) => {
    const User = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    if (selectedUsers.find((u) => u.id === User.id)) {
    } else {
      setSelectedUsers([...selectedUsers, {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role,
        access: access,
      }]);
      setUsers([]);
      setSearch("");
    }
  };

  //remove members from selected users
  const handleRemove = (user) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
  };

  const handleInviteAll = (id) => {
    let teamInvite = true;
    if (teamInvite) {
      selectedUsers.map((user) => {
        inviteTeamMembers(id, user, token)
          .then((res) => {
            console.log(res);
            dispatch(
              openSnackbar({
                message: `Invitation sent to ${user.name}`,
                type: "success",
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      selectedUsers.map((user) => {
        inviteTeamMembers(id, user, token)
          .then((res) => {
            console.log(res); dispatch(
              openSnackbar({
                message: `Invitation sent to ${user.name}`,
                type: "success",
              })
            );
          })
          .catch((err) => {
            console.log(err); dispatch(
              openSnackbar({
                message: `Invitation cant be sent to ${user.name}`,
                type: "error",
              })
            );
          });
      });
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      if (e.target.name === "tags") {
        return { ...prev, [e.target.name]: e.target.value.split(",") };
      } else {
        return { ...prev, [e.target.name]: e.target.value };
      }
    });
  };

  //add tools part

  const [TeamTools, setTeamTools] = useState([
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
    { name: "", icon: "", link: "" },
  ]);
  const handleToolschange = (index, event, icon) => {
    let data = [...TeamTools];
    //add it to input fields
    data[index].name = event.target.name;
    data[index].icon = icon;
    data[index].link = event.target.value;
    setTeamTools(data);
  };

  const CreateTeam = () => {
    setLoading(true);
    setDisabled(true);
    setBackDisabled(true);
    //remove the empty link objects of Team tools
    const tools = TeamTools.filter((tool) => tool.link !== "");
    const Team = {
      ...inputs,
      tools: tools,
    };
    createTeam(Team, token)
      .then((res) => {
        // get the id from res and invite members function call
        handleInviteAll(res.data._id);
        setLoading(false);
        setNewTeam(false);
        dispatch(
          openSnackbar({
            message: "Team created successfully",
            type: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setDisabled(false);
        setBackDisabled(false);
        dispatch(
          openSnackbar({
            message: "Something went wrong",
            type: "error",
          })
        );
      });
  };

  useEffect(() => {
    if (inputs.name === "" || inputs.desc === "") {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [inputs])

  const dispatch = useDispatch();

  return (
    <Modal open={true} onClose={() => setNewTeam(false)}>
      <Container>
        <Wrapper>
          <IconButton
            style={{
              position: "absolute",
              top: "18px",
              right: "30px",
              cursor: "pointer",
              color: "inherit",
            }}
            onClick={() => setNewTeam(false)}
          >
            <CloseRounded style={{ color: "inherit" }} />
          </IconButton>
          <Title>Create a new Team</Title>

          {showAddTeam && (
            <>
              <Label>Team Details :</Label>
              <ImageSelector inputs={inputs} setInputs={setInputs} style={{ marginTop: "12px" }}/>
              <OutlinedBox style={{ marginTop: "12px" }}>
                <TextInput
                  placeholder="Team Name (Required)*"
                  type="text"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                />
              </OutlinedBox>
              <OutlinedBox style={{ marginTop: "6px" }}>
                <Desc
                  placeholder="Description (Required)* "
                  name="desc"
                  rows={5}
                  value={inputs.desc}
                  onChange={handleChange}
                />
              </OutlinedBox>
              <OutlinedBox style={{ marginTop: "6px" }}>
                <Desc
                  placeholder="Tags: seperate by , eg- Mongo Db , React JS .."
                  name="tags"
                  rows={4}
                  value={inputs.tags}
                  onChange={handleChange}
                />
              </OutlinedBox>

              <OutlinedBox
                button={true}
                activeButton={!disabled}
                style={{ marginTop: "22px", marginBottom: "18px" }}
                onClick={() => { !disabled && goToAddTools() }}
              >
                Next
              </OutlinedBox>
            </>
          )}

          {showTools && (
            <>
              <Label>Tools :</Label>
              <ToolsContainer>
                {tools.map((tool, index) => (
                  <OutlinedBox style={{ marginTop: "8px" }} key={index}>
                    <Icon src={tool.icon} />
                    <TextInput
                      name={tool.name}
                      placeholder={`${tool.name} Link`}
                      type="text"
                      value={TeamTools[index].link}
                      onChange={(event) =>
                        handleToolschange(index, event, tool.icon)
                      }
                    />
                  </OutlinedBox>
                ))}
              </ToolsContainer>

              <ButtonContainer>
                <OutlinedBox
                  button={true}
                  activeButton={false}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => { !backDisabled && goToAddTeam() }}
                >
                  Back
                </OutlinedBox>
                <OutlinedBox
                  button={true}
                  activeButton={!disabled}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => {
                    goToAddMember();
                  }}
                >
                  Next
                </OutlinedBox>
              </ButtonContainer>
            </>
          )}

          {showAddMember && (
            <>
              <Label>Add Members :</Label>

              <AddMember>
                <Search>
                  <Input
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => handleSearch(e)}
                  />
                  <SearchOutlined
                    sx={{ fontSize: "20px" }}
                    style={{ marginRight: "12px", marginLeft: "12px" }}
                  />
                </Search>
                <UsersList>
                  {users.map((user) => (
                    <MemberCard>
                      <UserData>
                        <Avatar
                          sx={{ width: "34px", height: "34px" }}
                          src={user.img}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Details>
                          <Name>{user.name}</Name>
                          <EmailId>{user.email}</EmailId>
                        </Details>
                      </UserData>
                      <Flex>
                        <Access>
                          <Select name="Role" onChange={(e) => setAccess(e.target.value)}>
                            <option value="" selected disabled hidden>Access</option>
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                            <option value="Editor">Editor</option>
                            <option value="View Only">View Only</option>
                          </Select>
                        </Access>
                        <Role>
                          <Input style={{ width: '70px', fontSize: '12px', padding: '8px 10px' }} type="text" placeholder="Role" onChange={(e) => setRole(e.target.value)} />
                        </Role>

                      </Flex>
                      <InviteButton onClick={() => handleSelect(user)}>
                        Add
                      </InviteButton>
                    </MemberCard>
                  ))}
                  {selectedUsers.length === 0 && (
                    <div style={{ width: "100%", textAlign: "center" }}>
                      Search to add new members
                    </div>
                  )}
                  {selectedUsers.length > 0 && <div>Added Members :</div>}
                  {selectedUsers.map((user) => (
                    <MemberCard>
                      <UserData>
                        <Avatar
                          sx={{ width: "34px", height: "34px" }}
                          src={user.img}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Details>
                          <Name>{user.name}</Name>
                          <EmailId>{user.email}</EmailId>
                        </Details>
                      </UserData>
                      <Flex>
                        <Access>
                          {user.access}
                        </Access>
                        <Role style={{padding: '6px 10px'}}>
                          {user.role}
                        </Role>

                      </Flex>

                      <InviteButton onClick={() => handleRemove(user)}>
                        Remove
                      </InviteButton>
                    </MemberCard>
                  ))}
                </UsersList>
              </AddMember>

              <ButtonContainer>
                <OutlinedBox
                  button={true}
                  activeButton={false}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => { !backDisabled && goToAddTools() }}
                >
                  Back
                </OutlinedBox>
                <OutlinedBox
                  button={true}
                  activeButton={!disabled}
                  style={{ marginTop: "18px", width: "100%" }}
                  onClick={() => { !disabled && CreateTeam() }}
                >
                  {Loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : (
                    "Create Team"
                  )}
                </OutlinedBox>
              </ButtonContainer>
            </>
          )}
        </Wrapper>
      </Container>
    </Modal>
  );
};

export default AddNewTeam;
