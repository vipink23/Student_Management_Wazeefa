import { useState } from "react";
import { Outlet } from "react-router";
import { Box, CssBaseline, Paper } from "@mui/material";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

const drawerWidth = 240;

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CssBaseline />
      <Box
        sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar open={open} setOpen={setOpen} />

          {/* Main Content */}
          <Box
            sx={{
              flexGrow: 1,
              width: "100%",
              mt: 8,
              p: 0,
              transition: "margin 0.3s",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: "grey.20",
                boxShadow: "none",
                border: "none",
                mt:4
              }}
            >
              <Outlet />
            </Paper>
          </Box>
        </Box>
        <Box
          component="footer"
          sx={{
            bgcolor: "grey.50",
            p: 2,
            mt: 8,
            transition: "margin 0.3s",
            marginLeft: open ? `${drawerWidth}px` : "65px", 
          }}
        >
          <Footer />
        </Box>
      </Box>
    </>
  );
}
