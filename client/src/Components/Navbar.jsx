import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, Badge } from "@mui/material";
import { WbSunny as SunIcon, DarkMode as MoonIcon } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppContext } from "../context/AppContext";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { state, dispatch, mode, toggleTheme } = useAppContext();
  const navigate = useNavigate();

  const authToken = Cookies.get("token") || localStorage.getItem("token");

  // Cart Items Count
  const totalCartItems = state.basket.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await axios.post("http://localhost:4000/api/logout", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");

      dispatch({ type: "LOGOUT" });
      navigate("/loginPage");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px 20px",
          backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
          color: mode === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <Toolbar sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
          {/* 🔹 App Title */}
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            FastFood
          </Typography>

          {/* 🔹 Right Side Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* 🔹 Theme Toggle */}
            <IconButton color="inherit" onClick={toggleTheme}>
              {mode === "dark" ? <SunIcon /> : <MoonIcon />}
            </IconButton>

            {/* 🔹 Conditional Rendering: Agar user login nahi hai to sirf Login Button dikhaye */}
            {!state.user ? (
              <Button component={Link} to="/loginPage" variant="contained" color="error">
                Login
              </Button>
            ) : (
              <>
                {/* 🔹 Menu Button */}
                <Button component={Link} to="/menu" variant="contained">
                  Menu
                </Button>

                {/* 🔹 Cart Button */}
                <IconButton color="inherit" onClick={() => setCartOpen(true)}>
                  <Badge badgeContent={totalCartItems} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                {/* 🔹 Profile Button */}
                <IconButton color="inherit" component={Link} to="/my-orders">
                  <AccountCircleOutlinedIcon />
                </IconButton>

                {/* 🔹 Logout */}
                <Button onClick={handleLogout} variant="contained" color="error">
                  Logout
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>

      {/* 🔹 Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;



// import { useState, useEffect } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText, Badge } from "@mui/material";
// import { Menu as MenuIcon, WbSunny as SunIcon, DarkMode as MoonIcon } from "@mui/icons-material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useAppContext } from "../context/AppContext";
// import CartDrawer from "./CartDrawer";

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
//   const { state, dispatch, mode, toggleTheme } = useAppContext();
//   const navigate = useNavigate();

//   const authToken = Cookies.get("token") || localStorage.getItem("token");

//   // Cart Items Count
//   const totalCartItems = state.basket.reduce((total, item) => total + item.quantity, 0);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       if (token) {
//         await axios.post("http://localhost:5000/api/logout", {}, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//       }

//       Cookies.remove("token"); // ✅ Fix: Remove token from cookies as well
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("userEmail");

//       dispatch({ type: "LOGOUT" });
//       navigate("/loginPage");
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return (
//     <>
//       <AppBar
//         position="static"
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           padding: "10px 20px",
//           backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
//           color: mode === "dark" ? "#ffffff" : "#000000",
//         }}
//       >
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
//             FastFood
//           </Typography>

//           <IconButton color="inherit" sx={{ marginRight: "10px" }} onClick={toggleTheme}>
//             {mode === "dark" ? <SunIcon /> : <MoonIcon />}
//           </IconButton>

//           {state.user && (
//             <>
//               <Button component={Link} to="/menu" variant="contained" sx={{ marginRight: "10px" }}>
//                 Menu
//               </Button>

//               <IconButton color="inherit" onClick={() => setCartOpen(true)}>
//                 <Badge badgeContent={totalCartItems} color="error">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </IconButton>

//               <IconButton color="inherit" component={Link} to="/my-orders">
//                 <AccountCircleOutlinedIcon />
//               </IconButton>

//               <Button onClick={handleLogout} variant="contained" color="error">
//                 Logout
//               </Button>
//             </>
//           )}


//           {!state.user && (
//             <Button component={Link} to="/loginPage" variant="contained" color="error" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
//               Login
//             </Button>
//           )}



//         </Toolbar>
//       </AppBar>

//       <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
//     </>
//   );
// };

// export default Navbar;


















// import { useState, useEffect } from "react";
// import { AppBar, Toolbar, Typography, IconButton, Button, Drawer, List, ListItem, ListItemText, Badge } from "@mui/material";
// import { Menu as MenuIcon, WbSunny as SunIcon, DarkMode as MoonIcon } from "@mui/icons-material";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { useAppContext } from "../context/AppContext";
// import CartDrawer from "./CartDrawer";

// const Navbar = () => {
//   const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [cartOpen, setCartOpen] = useState(false);
  
//   // const { state, dispatch } = useAppContext();
//   const { state, dispatch, mode, toggleTheme } = useAppContext();

//   const navigate = useNavigate();

//   const authToken = Cookies.get("token") || localStorage.getItem("token");
//   console.log(localStorage.getItem("token"));
// console.log(localStorage.getItem("userEmail"));


//   // ✅ Cart Items Count (Ye Automatically Update Hoga)
//   const totalCartItems = state.basket.reduce((total, item) => total + item.quantity, 0);

//   const toggleDarkMode = () => {
//     setDarkMode((prev) => !prev);
//     localStorage.setItem("darkMode", !darkMode);
//   };

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);


  



//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
  
//       if (token) {
//         await axios.post("http://localhost:5000/api/logout", {}, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//       }
  
//       // Ensure all user data is cleared
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("userEmail");
  
//       dispatch({ type: "LOGOUT" });
//       navigate('/loginPage');
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };
  


//   useEffect(() => {
//     console.log("User Email on App Load:", localStorage.getItem("userEmail"));
//     console.log("Token on App Load:", localStorage.getItem("token"));
//   }, []);
  



//   return (
//     <>
//       <AppBar position="static" sx={{ backgroundColor: "#f5f5f5", color: "black", 
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "10px 20px",
//                 backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
//                 color: mode === "dark" ? "#ffffff" : "#000000",
        

//       }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ display: { sm: "none" } }}>
//             <MenuIcon />
//           </IconButton>

//           <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
//             FastFood
//           </Typography>

//           {/* <IconButton onClick={toggleTheme} color="inherit">
//           {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
//         </IconButton> */}

//           <IconButton color="inherit" sx={{ marginRight: "10px" }} onClick={toggleDarkMode}>
//             {darkMode ? <SunIcon /> : <MoonIcon />}
//           </IconButton>

//           {/* ✅ Cart Icon with Dynamic Badge (Updated Count) */}
//           {state.user && (
//             <>
//               <Button component={Link} to="/menu" variant="contained" sx={{ marginRight: "10px" }}>
//                 Menu
//               </Button>

//               <IconButton color="inherit" onClick={() => setCartOpen(true)}>
//                 <Badge badgeContent={totalCartItems} color="error">
//                   <ShoppingCartIcon />
//                 </Badge>
//               </IconButton>

//               <IconButton color="inherit" component={Link} to="/my-orders">
//                 <AccountCircleOutlinedIcon />
//               </IconButton>

//               <Button onClick={handleLogout} variant="contained" color="error">
//                 Logout
//               </Button>
//             </>
//           )}

//           {!state.user && (
//             <Button component={Link} to="/loginPage" variant="contained" color="error" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
//               Login
//             </Button>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* ✅ Cart Drawer (Cart Icon se Open Hoga) */}
//       <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

//       <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
//         <List>
//           <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
//             <ListItemText primary="FastFood" />
//           </ListItem>
//           {!authToken && (
//             <ListItem button component={Link} to="/loginPage" onClick={handleDrawerToggle}>
//               <ListItemText primary="Login" />
//             </ListItem>
//           )}
//         </List>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;



