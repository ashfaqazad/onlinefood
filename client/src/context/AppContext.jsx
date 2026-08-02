import { createContext, useReducer, useContext, useEffect, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const AppContext = createContext();

// Safe localStorage getters (SSR-safe + crash-safe JSON.parse)
const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getStoredBasket = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("basket");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const getStoredEmail = () => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("userEmail") || "";
};

const getStoredTheme = () => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") || "light";
};

const initialState = {
  basket: getStoredBasket(),
  user: getStoredUser(),
  userEmail: getStoredEmail(),
};

// Function to calculate total price
export const total = (basket) => {
  return basket.reduce((amount, item) => amount + item.price * item.quantity, 0);
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS": {
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
      return { ...state, user: action.payload };
    }

    case "LOGOUT": {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("basket");
      }
      return { ...state, user: null, basket: [], userEmail: "" };
    }

    case "SET_USER": {
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("user");
        }
      }
      return { ...state, user: action.payload };
    }

    case "SET_USER_EMAIL": {
      if (typeof window !== "undefined") {
        localStorage.setItem("userEmail", action.payload || "");
      }
      return { ...state, userEmail: action.payload };
    }

    case "ADD_TO_BASKET": {
      const existingItem = state.basket.find((item) => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          basket: state.basket.map((item) =>
            item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { ...state, basket: [...state.basket, { ...action.payload, quantity: 1 }] };
      }
    }

    case "INCREMENT_QUANTITY": {
      return {
        ...state,
        basket: state.basket.map((item) =>
          item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case "DECREMENT_QUANTITY": {
      return {
        ...state,
        basket: state.basket
          .map((item) =>
            item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0), // Remove item if quantity is 0
      };
    }

    case "REMOVE_FROM_BASKET": {
      return { ...state, basket: state.basket.filter((item) => item._id !== action.payload) };
    }

    case "CLEAR_BASKET": {
      return { ...state, basket: [] };
    }

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Sync basket to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("basket", JSON.stringify(state.basket));
    }
  }, [state.basket]);

  // 🎨 Theme State using useState
  const [mode, setMode] = useState(getStoredTheme);

  // Theme Toggle Function
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newMode);
    }
  };

  // MUI Theme Config
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary: { main: "#90caf9" },
                background: { default: "#121212", paper: "#1e1e1e" },
                text: { primary: "#ffffff", secondary: "#bbbbbb" },
              }
            : {
                primary: { main: "#1976d2" },
                background: { default: "#ffffff", paper: "#f5f5f5" },
                text: { primary: "#000000", secondary: "#555555" },
              }),
        },
      }),
    [mode]
  );

  return (
    <AppContext.Provider value={{ state, dispatch, mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};






















// import { createContext, useReducer, useContext, useEffect, useState, useMemo } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

// const AppContext = createContext();

// const initialState = {
//   basket: [],
//   user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage
//   userEmail: localStorage.getItem("userEmail") || "", // Store email in context
// };

// // Function to calculate total price
// export const total = (basket) => {
//   return basket.reduce((amount, item) => amount + item.price * item.quantity, 0);
// };

// const appReducer = (state, action) => {
//   switch (action.type) {
//     case "LOGIN_SUCCESS":
//       return { ...state, user: action.payload };

//     case "LOGOUT":
//       return { ...state, user: null, basket: [] };

//     case "SET_USER":
//       return { ...state, user: action.payload };

//     case "ADD_TO_BASKET":
//       const existingItem = state.basket.find((item) => item._id === action.payload._id);
//       if (existingItem) {
//         return {
//           ...state,
//           basket: state.basket.map((item) =>
//             item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
//           ),
//         };
//       } else {
//         return { ...state, basket: [...state.basket, { ...action.payload, quantity: 1 }] };
//       }

//     case "INCREMENT_QUANTITY":
//       return {
//         ...state,
//         basket: state.basket.map((item) =>
//           item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
//         ),
//       };

//     case "DECREMENT_QUANTITY":
//       return {
//         ...state,
//         basket: state.basket
//           .map((item) =>
//             item._id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
//           )
//           .filter((item) => item.quantity > 0), // ✅ Remove item if quantity is 0
//       };

//     case "REMOVE_FROM_BASKET":
//       return { ...state, basket: state.basket.filter((item) => item._id !== action.payload) };

//     case "CLEAR_BASKET":
//       return { ...state, basket: [] };

//     default:
//       return state;
//   }
// };

// export const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(appReducer, initialState);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && !state.user) {
//       dispatch({ type: "SET_USER", payload: storedUser });
//     }
//   }, [state.user]);

//   useEffect(() => {
//     console.log("Basket Updated:", JSON.stringify(state.basket, null, 2)); // Debugging
//   }, [state.basket]);

//   // 🎨 Theme State using useState
//   const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

//   // Theme Toggle Function
//   const toggleTheme = () => {
//     const newMode = mode === "light" ? "dark" : "light";
//     setMode(newMode);
//     localStorage.setItem("theme", newMode);
//   };

//   // MUI Theme Config
//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//           ...(mode === "dark"
//             ? {
//                 primary: { main: "#90caf9" },
//                 background: { default: "#121212", paper: "#1e1e1e" },
//                 text: { primary: "#ffffff", secondary: "#bbbbbb" },
//               }
//             : {
//                 primary: { main: "#1976d2" },
//                 background: { default: "#ffffff", paper: "#f5f5f5" },
//                 text: { primary: "#000000", secondary: "#555555" },
//               }),
//         },
//       }),
//     [mode]
//   );

//   return (
//     <AppContext.Provider value={{ state, dispatch, mode, toggleTheme }}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//   return useContext(AppContext);
// };



















// // import { createContext, useReducer, useContext, useEffect, useState, useMemo  } from 'react';
// // import { ThemeProvider, createTheme } from "@mui/material/styles";
// // import CssBaseline from "@mui/material/CssBaseline";




// // const AppContext = createContext();

// // const initialState = {
// //     basket: [],
// //     user: JSON.parse(localStorage.getItem("user")) || null, // Load from localStorage
// //     userEmail: localStorage.getItem("userEmail") || "", // Store email in context

// // };

// // // Function to calculate total price
// // export const total = (basket) => {
// //     return basket.reduce((amount, item) => amount + item.price * item.quantity, 0);
// // };



// // const appReducer = (state, action) => {
// //   switch (action.type) {
// //     case "LOGIN_SUCCESS": {  // ✅ Add this case
// //       return {
// //         ...state,
// //         user: action.payload,  // ✅ User ko state me store karein
// //       };
// //     }

// //     case "LOGOUT": {
// //       return {
// //         ...state,
// //         user: null,  // ✅ Remove user from state
// //         basket: [],  // ✅ Optional: Clear basket on logout
// //       };
// //     }

// //     case "ADD_TO_BASKET": {
// //       console.log("🛒 Adding to basket:", action.payload); 
    
// //       const existingItem = state.basket.find((item) => item._id === action.payload._id);
    
// //       if (existingItem) {
// //         console.log("✅ Item already exists, updating quantity");
// //         const updatedBasket = state.basket.map((item) =>
// //           item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
// //         );
// //         return { ...state, basket: updatedBasket };
// //       } else {
// //         console.log("🆕 New item added:", action.payload);
// //         return { ...state, basket: [...state.basket, { ...action.payload, quantity: 1 }] };
// //       }
// //     }
    



// //     case "INCREMENT_QUANTITY": {
// //       return {
// //         ...state,
// //         basket: state.basket.map((item) =>
// //           item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
// //         ),
// //       };
// //     }
    
// //     case "DECREMENT_QUANTITY": {
// //       return {
// //         ...state,
// //         basket: state.basket.map((item) =>
// //           item._id === action.payload && item.quantity > 1
// //             ? { ...item, quantity: item.quantity - 1 }
// //             : item
// //         ),
// //       };
// //     }
    
// //     case "REMOVE_FROM_BASKET": {
// //       return {
// //         ...state,
// //         basket: state.basket.filter((item) => item._id !== action.payload),
// //       };
// //     }
    

// //     case "CLEAR_BASKET":
// //       return { ...state, basket: [] };
  



// //     default:
// //       return state;
// //   }
// // };


// // export const AppProvider = ({ children }) => {
// //     const [state, dispatch] = useReducer(appReducer, initialState);

// //     useEffect(() => {
// //         const storedUser = JSON.parse(localStorage.getItem("user"));
// //         if (storedUser && !state.user) {
// //             dispatch({ type: 'SET_USER', payload: storedUser });
            
// //         }
// //     }, []);

// //     useEffect(() => {
// //         console.log("Basket Updated:", JSON.stringify(state.basket, null, 2)); // Debugging
// //     }, [state.basket]);






// //   // 🎨 Theme State using useState
// //   const [mode, setMode] = useState(localStorage.getItem("theme") || "light");

// //   // Theme Toggle Function
// //   const toggleTheme = () => {
// //     const newMode = mode === "light" ? "dark" : "light";
// //     setMode(newMode);
// //     localStorage.setItem("theme", newMode);
// //   };

// //   // MUI Theme Config
// //   const theme = useMemo(
// //     () =>
// //       createTheme({
// //         palette: {
// //           mode,
// //           ...(mode === "dark"
// //             ? {
// //                 primary: { main: "#90caf9" },
// //                 background: { default: "#121212", paper: "#1e1e1e" },
// //                 text: { primary: "#ffffff", secondary: "#bbbbbb" },
// //               }
// //             : {
// //                 primary: { main: "#1976d2" },
// //                 background: { default: "#ffffff", paper: "#f5f5f5" },
// //                 text: { primary: "#000000", secondary: "#555555" },
// //               }),
// //         },
// //       }),
// //     [mode]
// //   );





// //     return (
// //         <AppContext.Provider value={{ state, dispatch, mode, toggleTheme }}>

// //       <ThemeProvider theme={theme}>
// //         <CssBaseline />
// //         {children}
// //       </ThemeProvider>
// //         </AppContext.Provider>
// //     );
// // };

// // export const useAppContext = () => {
// //     return useContext(AppContext);
// // };




































// // // // src/context/AppContext.js
// // // import { createContext, useReducer, useContext } from 'react';

// // // const AppContext = createContext();

// // // const initialState = {
   
// // //     basket: [],
// // //     user: null,  // User will be null initially until login
// // // };


// // // // const initialState = {
// // // //     basket: [
// // // //         {
// // // //             id: 1,
// // // //             title: "Sample Product",
// // // //             image: "https://via.placeholder.com/150",
// // // //             rating: 4,
// // // //             price: 100,
// // // //         },
// // // //     ],
// // // //     user: null,
// // // // };


// // // export const total = (basket) => {
// // //     return basket.reduce((amount, item) => amount + item.price, 0);
// // // };


// // // const appReducer = (state, action) => {
// // //     switch (action.type) {
// // //         case 'ADD_TO_BASKET':
// // //             return {
// // //                 ...state,
// // //                 basket: [...state.basket, action.payload],
// // //             };
// // //         case 'REMOVE_FROM_BASKET':
// // //             return {
// // //                 ...state,
// // //                 basket: state.basket.filter(item => item.id !== action.payload.id),
// // //             };
// // //         case 'SET_USER':
// // //             return {
// // //                 ...state,
// // //                 user: action.payload,
// // //             };
// // //         case 'LOGOUT':
// // //             return {
// // //                 ...state,
// // //                 user: null,
// // //                 basket: [],
// // //             };
// // //             case 'CLEAR_BASKET': // Add this case
// // //             return {
// // //                 ...state,
// // //                 basket: [],
// // //             };

// // //         default:
// // //             return state;
// // //     }
// // // };

// // // export const AppProvider = ({ children }) => {
// // //     const [state, dispatch] = useReducer(appReducer, initialState);

// // //     return (
// // //         <AppContext.Provider value={{ state, dispatch }}>
// // //             {children}
// // //         </AppContext.Provider>
// // //     );
// // // };

// // // // Custom hook to use app context
// // // export const useAppContext = () => {
// // //     return useContext(AppContext);
// // // };
