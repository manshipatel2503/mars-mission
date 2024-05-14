import React, { useState } from "react";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import engineerImg from "../../assets/engineer.png";
import personImg from "../../assets/person.png";
import pilotImg from "../../assets/pilot.png";
import { getOptionValueById, jobTypes, memberTypes } from "../../data/constant";
import "./MemberList.css";
import ConfirmationDialog from "../ui/ConfirmationDialog";

interface MemberListProps {
  members: Members[];
  handleEditMember: (memberId: number | undefined) => void;
  handleDeleteMember: (memberId: number | undefined) => void;
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  handleEditMember,
  handleDeleteMember,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [memberIdToDelete, setMemberIdToDelete] = useState<number>();

  const handleDeleteConfirmationOpen = (memberId?: number) => {
    if (memberId !== undefined) {
      setMemberIdToDelete(memberId);
      setDeleteConfirmationOpen(true);
    }
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
    setMemberIdToDelete(undefined);
  };

  const handleDeleteConfirmation = () => {
    if (memberIdToDelete !== undefined) {
      handleDeleteMember(memberIdToDelete);
      setDeleteConfirmationOpen(false);
      setMemberIdToDelete(undefined);
    }
  };

  // Display member list
  return (
    <div className="add-member-section">
      {members.map((member) => (
        <List
          key={member.id}
          sx={{
            display: "flex",
            width: "100%",
            maxWidth: 360,
            flexDirection: "column",
            bgcolor: "background.paper",
            marginLeft: "10px",
          }}
        >
          <ListItem
            className="member-list"
            sx={{
              display: "flex",

              height: 100,
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <img
                  src={
                    member.type === 1
                      ? pilotImg
                      : member.type === 2
                      ? engineerImg
                      : personImg
                  }
                  alt="text"
                  style={{ width: "50px", height: "50px" }}
                ></img>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={getOptionValueById(memberTypes, member.type)}
              secondary={
                <React.Fragment>
                  <div>
                    <span>
                      {member.type === 2 && (
                        <div>
                          <span>Job:</span>
                          <span>
                            {getOptionValueById(jobTypes, member.job)}
                          </span>
                        </div>
                      )}
                      {(member.type === 2 || member.type === 1) && (
                        <div>
                          <span>Experience:</span>
                          <span data-testid="experience">
                            {member.experience} years
                          </span>
                        </div>
                      )}
                      {member.type === 3 && (
                        <div>
                          <span>Age:</span>{" "}
                          <span data-testid="member-age">{member.age}</span>
                        </div>
                      )}
                      {member.type === 3 && (
                        <div>
                          <span>Wealth:</span>{" "}
                          <span data-testid="member-wealth">
                            {member.wealth}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                  <div className="action-buttons">
                    <Button onClick={() => handleEditMember(member.id)}>
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteConfirmationOpen(member.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      ))}

      <ConfirmationDialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onConfirm={handleDeleteConfirmation}
        title="Delete Member"
        contentText="Are you sure you want to delete this member?"
        confirmButtonText="Delete"
        rejectButtonText="Cancel"
      />
    </div>
  );
};

export default MemberList;
