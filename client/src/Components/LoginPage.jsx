import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Container, Card, CardContent, Typography, Button, TextField } from "@mui/material";

const LoginPage = () => {
  const [activeButton, setActiveButton] = useState("login"); // Default: Login active
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    const url = activeButton === "register"
      ? "http://localhost:4000/api/register"
      : "http://localhost:4000/api/login";

    axios.post(url, formData, { withCredentials: true })
      .then((res) => {
        alert(res.data.message);

        if (activeButton === "login" && res.data.token) {
          const userData = { 
            id: res.data.id, 
            username: res.data.username,
            email: res.data.email,
          };

          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("user", JSON.stringify(userData));

          console.log("User Email after login:", res.data.email);
          console.log("Token after login:", res.data.token);

          dispatch({ type: "LOGIN_SUCCESS", payload: userData });
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || "Something went wrong");
      });
  };

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

              {/* Form */}
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
};

export default LoginPage;
