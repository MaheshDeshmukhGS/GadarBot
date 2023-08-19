import { Box } from "@mui/material";
import React from "react";
import { v4 as uuid } from "uuid";
import Button from "@mui/material/Button";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";

const Sidebar = () => {
  const recentChats = [
    {
      id: uuid(),
      heading: "Showing Error while scanning",
    },
    {
      id: uuid(),
      heading: "Showing Error while scanning",
    },
    {
      id: uuid(),
      heading: "Showing Error while scanning",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#171717",
        color: "#fff",
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "0 24px",
        cursor: "pointer",
      }}
    >
      <Button
        variant="outlined"
        sx={{
          color: "#fff",
          borderColor: "#fff",
          "&:hover": {
            borderColor: "#fff",
          },
        }}
      >
        + NEW CHAT
      </Button>
      {recentChats?.map(chat => {
        const { heading, id } = chat;
        return (
          <Box key={id} sx={{ display: "flex", alignItems: "center", gap: "1rem",  "&:hover": {
            opacity:"0.7",
            transition:"opacity ease 200ms"
          }, }}>
            <TurnedInNotIcon />
            {heading}
          </Box>
        );
      })}
    </Box>
  );
};

export default Sidebar;
