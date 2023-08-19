import { Box } from "@mui/material";
import React from "react";

const ChatBox = ({ text, isSystemGenerated }) => {
  return (
    <Box
      sx={{
        backgroundColor: isSystemGenerated ? "#fff" : "#E7FFFE",
        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        padding: "2rem",
        borderRadius: "11px",
      }}
    >
      {text}
    </Box>
  );
};

export default ChatBox;
