import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import LoginPage from './Components/LoginPage';
import MenuPage from "./Pages/MenuPage";
import MyOrders from './Pages/MyOrders';





function App() {
  // const name = [{ name: "Ashfaq", age: 45 }];

  return (
    <>

<Router>
      <Navbar />
      <Routes>
        {/* Define routes */}
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="/menu" element={<MenuPage />} /> {/* Ye Menu ka route hai */}
        <Route path="/my-orders" element={<MyOrders />} />


        {/* <Route path="/signup" element={<Signup/>} /> */}
      </Routes>
    </Router>



    </>
  );
}

export default App;





// function App() {
//   const name = [{ name: "Ashfaq", age: 45 }];

//   return (
//     <>
//       {name.map((item) => (
//         <div key={item.name}>
//           <h3>Name: {item.name}</h3>
//           <h3>Age: {item.age}</h3>
//         </div>
//       ))}
//     </>
//   );
// }

// export default App;
