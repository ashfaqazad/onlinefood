import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import { Container, Card, CardContent, Typography, Button, TextField } from "@mui/material";

function LoginPage() {
  const [activeButton, setActiveButton] = useState("login"); // Default: Login active
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const { state, dispatch } = useAppContext();
  // const { state, dispatch } = useState();



  const [error, setError] = useState("");
  // const { state, dispatch } = useAppContext();
  
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors
  
    const url = activeButton === "register" 
      ? "http://localhost:5000/api/register" 
      : "http://localhost:5000/api/login";
  
    axios.post(url, formData, { withCredentials: true })
      .then((res) => {
        alert(res.data.message);
  
        if (activeButton === "login" && res.data.token) {
          const userData = { id: res.data.id, username: res.data.username };
  
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("user", JSON.stringify(userData));
  
          dispatch({ type: "LOGIN_SUCCESS", payload: userData });  // ✅ User ko global state me save karein
  
          navigate('/');  // ✅ Redirect to home page
        }
  
        setFormData({ username: "", email: "", password: "" });
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Something went wrong");
      });
  };
  




// const handleSubmit = (e) => {
//   e.preventDefault();
//   setError(""); // Reset previous errors

//   const url = activeButton === "register" 
//     ? "http://localhost:5000/api/register" 
//     : "http://localhost:5000/api/login";

//   axios.post(url, formData, { withCredentials: true })  // ✅ Correct Syntax
//   .then((res) => {
//       alert(res.data.message);

//       // ✅ If login successful, store user data & JWT token
//       if (activeButton === "login" && res.data.token) {
//           const userData = { id: res.data.id, username: res.data.username };

//           localStorage.setItem("authToken", res.data.token);  // ✅ Save token
//           localStorage.setItem("user", JSON.stringify(userData));  // ✅ Save user data

//           dispatch({ type: 'SET_USER', payload: userData });  // ✅ Update global state

//           console.log("User Data Stored:", userData);
//           console.log("JWT Token:", res.data.token);

//           navigate('/');  // ✅ Redirect to home page
//       }

//       // ✅ Reset fields after successful submission
//       setFormData({ username: "", email: "", password: "" });
//   })
//   .catch((error) => {
//       setError(error.response?.data?.message || "Something went wrong");
//   });
// };

  return (
    <div>
      <Container style={{ display: "flex", width: "100vw", height: "100vh" }}>
        {/* Left Side - Login/Register Form */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Card style={{ padding: "20px", borderRadius: "10px" }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold">Welcome to FastFood</Typography>
              <Typography variant="body2" color="textSecondary">
                Sign in or create an account to order
              </Typography>

              <div style={{ display: "flex", gap: "10px", marginTop: "20px", backgroundColor: "#E0E0E0", padding: "5px" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setActiveButton("login")}
                  style={{
                    backgroundColor: activeButton === "login" ? "white" : "transparent",
                    color: "black",
                  }}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setActiveButton("register")}
                  style={{
                    backgroundColor: activeButton === "register" ? "white" : "transparent",
                    color: "black",
                  }}
                >
                  Register
                </Button>
              </div>

              {/* Error Message */}
              {error && <Typography color="error" style={{ marginTop: "10px" }}>{error}</Typography>}

              {/* Register Form */}
              <form onSubmit={handleSubmit}>
                {activeButton === "register" && (
                  <>
                    <TextField 
                      fullWidth label="Username" name="username" margin="normal" variant="outlined" 
                      onChange={handleChange} value={formData.username} required 
                    />
                    <TextField 
                      fullWidth label="Email" name="email" type="email" margin="normal" variant="outlined" 
                      onChange={handleChange} value={formData.email} required 
                    />
                    <TextField 
                      fullWidth label="Password" name="password" type="password" margin="normal" variant="outlined" 
                      onChange={handleChange} value={formData.password} required 
                    />
                  </>
                )}

                {/* Login Form */}
                {activeButton === "login" && (
                  <>
                    <TextField 
                      fullWidth label="Email" name="email" type="email" margin="normal" variant="outlined" 
                      onChange={handleChange} value={formData.email} required 
                    />
                    <TextField 
                      fullWidth label="Password" name="password" type="password" margin="normal" variant="outlined" 
                      onChange={handleChange} value={formData.password} required 
                    />
                  </>
                )}

                <Button fullWidth variant="contained" color="error" style={{ marginTop: "20px" }} type="submit">
                  {activeButton === "login" ? "Login" : "Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Full Screen Image */}
        <div
          style={{
            flex: 1,
            width: "100%",
            height: "100vh",
            backgroundImage: 'url("https://images.unsplash.com/photo-1576048177169-f0622a66adbd")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </Container>
    </div>
  );
}

export default LoginPage;






//     // const url = activeButton === "register" ? "http://localhost:3000/api/auth/register" : "http://localhost:3000/api/auth/login";


// import { useState } from "react";
// import { Container, Card, CardContent, Typography, Button, TextField } from "@mui/material";

// function LoginPage() {
//   const [activeButton, setActiveButton] = useState("login"); // Default: Login active

//   const handleButtonClick = (button) => {
//     setActiveButton(button);
//   };

//   return (
//     <div>
//       <Container style={{ display: "flex", width: "100vw", height: "100vh" }}>
//         {/* Left Side - Login/Register Form */}
//         <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <Card style={{ padding: "20px", borderRadius: "10px" }}>
//             <CardContent>
//               <Typography variant="h5" fontWeight="bold">Welcome to FastFood</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Sign in or create an account to order
//               </Typography>

//               <div style={{ display: "flex", gap: "10px", marginTop: "20px", backgroundColor: "#E0E0E0", padding: "5px" }}>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={() => handleButtonClick("login")}
//                   style={{
//                     backgroundColor: activeButton === "login" ? "white" : "transparent",
//                     color: "black",
//                   }}
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   onClick={() => handleButtonClick("register")}
//                   style={{
//                     backgroundColor: activeButton === "register" ? "white" : "transparent",
//                     color: "black",
//                   }}
//                 >
//                   Register
//                 </Button>
//               </div>

//               {/* Register Form */}
//               {activeButton === "register" && (
//                 <>
//                   <TextField fullWidth label="Username" margin="normal" variant="outlined" style={{ marginTop: "20px" }} />
//                   <TextField fullWidth label="Email" type="email" margin="normal" variant="outlined" style={{ marginTop: "20px" }} />
//                   <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" />
//                 </>
//               )}

//               {/* Login Form */}
//               {activeButton === "login" && (
//                 <>
//                   <TextField fullWidth label="Email" type="email" margin="normal" variant="outlined" style={{ marginTop: "20px" }} />
//                   <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" />
//                 </>
//               )}

//               <Button fullWidth variant="contained" color="error" style={{ marginTop: "20px" }}>
//                 {activeButton === "login" ? "Login" : "Register"}
//               </Button>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side - Full Screen Image */}
//         <div
//           style={{
//             flex: 1,
//             width: "100%",
//             height: "100vh",
//             backgroundImage: 'url("https://images.unsplash.com/photo-1576048177169-f0622a66adbd")',
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//           }}
//         ></div>
//       </Container>
//     </div>
//   );
// }

// export default LoginPage;
