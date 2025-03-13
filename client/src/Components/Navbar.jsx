import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText, Badge } from "@mui/material";
import { Menu as MenuIcon, WbSunny as SunIcon, DarkMode as MoonIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppContext } from "../context/AppContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  
  // const { state, dispatch } = useAppContext();
  const { state, dispatch } = useAppContext();

  const navigate = useNavigate();

  const authToken = Cookies.get("token") || localStorage.getItem("token");

  // ✅ Cart Items Count (Ye Automatically Update Hoga)
  const totalCartItems = state.basket.reduce((total, item) => total + item.quantity, 0);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    localStorage.setItem("darkMode", !darkMode);
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);


  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
  
  //     // ✅ Token remove from storage
  //     Cookies.remove("token");
  //     localStorage.removeItem("token");
  
  //     // ✅ Debugging: Check token after removal
  //     console.log("Token after logout (Cookie):", Cookies.get("token")); // Expected: undefined
  //     console.log("Token after logout (LocalStorage):", localStorage.getItem("token")); // Expected: null
  
  //     // ✅ Dispatch logout action
  //     dispatch({ type: "LOGOUT" });
  //     console.log("User after logout:", state.user);

  
  //     // ✅ Navigate to login after a short delay
  //     setTimeout(() => navigate("/loginPage"), 500);
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   }
  // };
  
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
  
      await axios.post("http://localhost:5000/api/logout", {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      navigate('/loginPage')
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  

  // const handleLogout = async () => {
  //   try {
  //     await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
  //     localStorage.removeItem("token");
  //     Cookies.remove("token");
  //     dispatch({ type: "LOGOUT" });
  //     navigate("/loginPage");
  //   } catch (error) {
  //     console.error("Logout failed", error);
  //   }
  // };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", color: "black" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
            FastFood
          </Typography>

          <IconButton color="inherit" sx={{ marginRight: "10px" }} onClick={toggleDarkMode}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>

          {/* ✅ Cart Icon with Dynamic Badge (Updated Count) */}
          {state.user && (
            <>
              <Button component={Link} to="/menu" variant="contained" sx={{ marginRight: "10px" }}>
                Menu
              </Button>

              <IconButton color="inherit" onClick={() => setCartOpen(true)}>
                <Badge badgeContent={totalCartItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit" component={Link} to="/my-orders">
                <AccountCircleOutlinedIcon />
              </IconButton>

              <Button onClick={handleLogout} variant="contained" color="error">
                Logout
              </Button>
            </>
          )}

          {!state.user && (
            <Button component={Link} to="/loginPage" variant="contained" color="error" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {/* ✅ Cart Drawer (Cart Icon se Open Hoga) */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="FastFood" />
          </ListItem>
          {!authToken && (
            <ListItem button component={Link} to="/loginPage" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;










// import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { useAppContext } from "../context/AppContext";
// import { useState } from "react";
// import CartDrawer from "./CartDrawer"; // Make sure CartDrawer is imported

// const Navbar = () => {
//     const { state } = useAppContext();
//     const [cartOpen, setCartOpen] = useState(false);

//     return (
//         <>
//             <AppBar position="static">
//                 <Toolbar>
//                     <Typography variant="h6" style={{ flexGrow: 1 }}>
//                         Food Delivery
//                     </Typography>
//                     <IconButton color="inherit" onClick={() => setCartOpen(true)}>
//                         <Badge badgeContent={state.basket.length} color="error">
//                             <ShoppingCartIcon />
//                         </Badge>
//                     </IconButton>
//                 </Toolbar>
//             </AppBar>

//             {/* Cart Drawer */}
//             <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
//         </>
//     );
// };

// export default Navbar;













// import { useEffect, useState } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
// // import { Menu as MenuIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from "@mui/icons-material";
// import { Menu as MenuIcon, WbSunny as SunIcon, DarkMode as MoonIcon } from "@mui/icons-material";

// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const toggleDarkMode = () => setDarkMode(!darkMode);
//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
//   // const [authToken, setAuthToken] = useState(null);
//   const [authToken, setAuthToken] = useState(localStorage.getItem("token"));




//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     console.log("Fetched Token:", token);  // Debugging ke liye
//     setAuthToken(token);
//   }, []);
  

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Token remove karo
//     setAuthToken(null); // State update karo
//     window.location.reload(); // Page refresh for Navbar update
//   };


//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", color: "black" }}>
//         <Toolbar>
//           {/* Mobile Menu Button */}
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
//             <MenuIcon />
//           </IconButton>

//           {/* Left Side: FastFood */}
//           <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
//             FastFood
//           </Typography>



//           {authToken ? (
//             <>
//               <Button onClick={handleLogout} variant="contained" color="error">
//                 Logout
//               </Button>
//               <Button component={Link} to="/menu" variant="contained" sx={{ marginLeft: "10px" }}>
//                 Menu
//               </Button>
//             </>
//           ) : (
//             <>
//               {/* Right Side Buttons */}
//               <IconButton color="inherit" onClick={toggleDarkMode}>
//                 {darkMode ? <SunIcon /> : <MoonIcon />}
//               </IconButton>

//               <Button component={Link} to="/loginPage" variant="contained" color="error" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
//                 Login
//               </Button>
//             </>
//           )}



//           {/* Right Side Buttons */}

//           {/* <IconButton color="inherit" onClick={toggleDarkMode}> */}
//           {/* {darkMode ? <LightModeIcon /> : <DarkModeIcon />} */}
//           {/* {darkMode ? <SunIcon /> : <MoonIcon />}

//           </IconButton>


//           <Button component={Link} to="/loginPage" variant="contained" color="error" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
//             Login
//           </Button> */}


//         </Toolbar>
//       </AppBar>

//       {/* Mobile Drawer */}
//       <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
//         <List>
//           <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
//             <ListItemText primary="FastFood" />
//           </ListItem>
//           <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
//             <ListItemText primary="Login" />
//           </ListItem>
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
