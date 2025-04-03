import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Box,
  MenuItem,
  Select,
  Collapse,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext

// Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffe9f2",
    },
    background: {
      default: "#f4f4f4",
    },
  },
});

// Styled Search Component
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "#f4f4f4",
  "&:hover": {
    backgroundColor: "#ffffff",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "500px", // Desktop width
  height: "40px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "600px",
  },
  
  display: "flex",
  alignItems: "center",
  
}));

// Styled InputBase
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 2),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const NavBar = ({ onOpenSignin, openSignin }) => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();

  const [category, setCategory] = useState("All Categories");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCart = () => {
    navigate("/cart");
  };

  const handleLogin = () => {
    onOpenSignin();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = () => {
    console.log("Search:", category);
    // Implement your search logic here
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          paddingLeft: "100px", // Desktop padding
          paddingRight: "100px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          height: "80px",
          filter: openSignin ? "blur(8px)" : "none",
          transition: "filter 0.3s ease-in-out",
          [theme.breakpoints.down("sm")]: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          {/* UrbanThreads logo (desktop) */}
          <Button
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              fontFamily: "Pacifico",
              fontWeight: 400,
              color: "#d83832",
              fontSize: "1.25rem",
              "&:hover": {
                backgroundColor: "transparent",
              },
              display: { xs: "none", sm: "block" }, // Hide on mobile
            }}
          >
            UrbanThreads
          </Button>

          {/* dont change */}
          <Box sx={{ display: { xs: "none", sm: "block" }, marginRight: "150px" }} /> 

          {/* Desktop Search (always visible) */}
          <Search
            sx={{
              display: { xs: "none", sm: "flex" },
              marginRight: "150px",
            }}
          >
            <Select
              value={category}
              onChange={handleCategoryChange}
              sx={{
                marginRight: 2,
                height: "40px",
                border: "none",
                ".MuiOutlinedInput-notchedOutline": { border: "none" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="All Categories">All Categories</MenuItem>
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Home and Living">Home and Living</MenuItem>
            </Select>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                marginLeft: 1,
                height: "40px",
                borderRadius: "20px",
                boxShadow: "none",
                backgroundColor: "#d21b14",
                "&:hover": {
                  backgroundColor: "#c41a12",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSearch}
            >
              <SearchIcon sx={{ color: "white" }} />
            </Button>
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          {/* Cart and Login/Logout (desktop only) */}
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <IconButton color="inherit" onClick={handleCart}>
              <ShoppingCartIcon />
            </IconButton>
            {!authState.loggedIn ? (
              <Button color="inherit" onClick={handleLogin}>
                Login
              </Button>
            ) : (
              <Button
                color="inherit"
                sx={{ color: "#d83832" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            )}
          </Box>

          {/* Mobile view starts here */}
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            {/* UrbanThreads logo (mobile) */}
            <Button
              onClick={() => navigate("/")}
              sx={{
                textTransform: "none",
                fontFamily: "Pacifico",
                fontWeight: 400,
                color: "#d83832",
                fontSize: "1.25rem",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              UrbanThreads
            </Button>

            {/* Mobile Search, Cart, and Login/Logout */}
            <Box>
              <IconButton color="inherit" onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleCart}>
                <ShoppingCartIcon />
              </IconButton>
              {!authState.loggedIn ? (
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
              ) : (
                <Button
                  color="inherit"
                  sx={{ color: "#d83832" }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Box>
          </Box>

          {/* Collapsible Search bar (only visible on mobile, below navbar) */}
          <Collapse
            in={searchOpen}
            timeout="auto"
            unmountOnExit
            sx={{
              width: "100%",
              position: "absolute",
              left: 0,
              top: "80px",
              zIndex: 1000,
              backgroundColor: "white", 
              paddingBottom: "10px"
            }}
          >
            <Search
              sx={{
                width: "100%",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Add box shadow for better visibility
              }}
            >
              <Select
                value={category}
                onChange={handleCategoryChange}
                sx={{
                  marginRight: 2,
                  height: "40px",
                  border: "none",
                  ".MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value="All Categories">All Categories</MenuItem>
                <MenuItem value="Men">Men</MenuItem>
                <MenuItem value="Women">Women</MenuItem>
                <MenuItem value="Kids">Kids</MenuItem>
                <MenuItem value="Home and Living">Home and Living</MenuItem>
              </Select>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  marginLeft: 1,
                  height: "40px",
                  borderRadius: "20px",
                  boxShadow: "none",
                  backgroundColor: "#d21b14",
                  "&:hover": {
                    backgroundColor: "#c41a12",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={handleSearch}
              >
                <SearchIcon sx={{ color: "white" }} />
              </Button>
            </Search>
          </Collapse>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default NavBar;