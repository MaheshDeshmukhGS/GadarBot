import { ThemeProvider } from "@mui/material/styles";
import "./App.css";
import customTheme from "./customTheme";
import ResponsiveAppBar from "./Components/Navbar/Navbar";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Sidebar from "./Components/Sidebar/Sidebar";
import ChatInput from "./Components/ChatInput/ChatInput";
import ChatBox from "./Components/ChatBox/ChatBox";

function App() {
  const chat = [
    {
      message: "How do i use GScan to send my mid-mile bags from bangalore to hyderabad",
      isSystemGenerated: true,
    },
    {
      message:
        '1. Click on "Mid-Mile Bag Preparation" from GScan.2. Scan each shipment AWBs and click on the Download label & Complete 3. Take a print of your label and paste it in your bag 4. Click on Mid-Mile Out Scan feature and scan the bag label 5. Ask the user from the receiving end of the bag to click on the Mid-Mile In Scan feature and scan the same bag label pasted on the bag. 6. You have completed your mid-mile journey successfully',
      isSystemGenerated: false,
    },
  ];
  return (
    <ThemeProvider theme={customTheme}>
      <ResponsiveAppBar />
      <Box sx={{ display: "grid", gridTemplateColumns: "300px 1fr" }}>
        <Sidebar />
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap:"1rem", padding:"20px 35px", boxSizing:"border-box" }}>
          {chat?.map(details => {
            return <ChatBox isSystemGenerated={details?.isSystemGenerated} text={details?.message}/>;
          })}
          <ChatInput />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
