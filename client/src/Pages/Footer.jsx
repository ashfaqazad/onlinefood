import { Box, Typography, Container, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

function Footer() {
    const socialLinks = [
        { to: "https://www.facebook.com/", icon: <FacebookIcon />, bgColor: "#1877F2" },
        { to: "https://wa.me/", icon: <WhatsAppIcon />, bgColor: "#25D366" },
        { to: "https://twitter.com/", icon: <TwitterIcon />, bgColor: "#1DA1F2" },
        { to: "https://www.instagram.com/", icon: <InstagramIcon />, bgColor: "#E1306C" },
    ];

    return (
        <Box sx={{ backgroundColor: "#0a4275", color: "#333", width: "100%", mt: 4 }}>
            <Container sx={{ py: 3, textAlign: "center" }}>
                {/* Footer Title */}
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Connect With Us
                </Typography>

                {/* Social Icons */}
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                    {socialLinks.map((link, index) => (
                        <IconButton
                            key={index}
                            component="a"
                            href={link.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                backgroundColor: link.bgColor,
                                color: "white",
                                "&:hover": { transform: "scale(1.1)", transition: "0.3s" },
                            }}
                        >
                            {link.icon}
                        </IconButton>
                    ))}


                </Box>

                {/* Footer Text */}
                {/* <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Quality food, delivered with love. Stay connected for the latest updates!
        </Typography> */}

                <Typography variant="body2">
                    © {new Date().getFullYear()}{" "}
                    <a href="#" style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
                        AzadDev 💕
                    </a>{" "}
                    - All Rights Reserved.
                </Typography>

            </Container>

            {/* Copyright Section */}
            {/* <Box sx={{ backgroundColor: "#e9ecef", py: 2, textAlign: "center" }}>
                <Typography variant="body2">
                    © {new Date().getFullYear()}{" "}
                    <a href="#" style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}>
                        AzadDev 💕
                    </a>{" "}
                    - All Rights Reserved.
                </Typography>
            </Box> */}
        </Box>
    );
}

export default Footer;
