const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const CreateUser = require('./routes/createUser');
const DisplayData = require('./routes/DisplayData');
const ordersData = require('./routes/ordersData');

require("dotenv").config();
const mongoDB = require('./db');

const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: 'http://localhost:5174',
  credentials: true,
};
app.use(cors(corsOptions)); // ✅ Only use this

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api', CreateUser);
app.use('/api', DisplayData);
app.use('/api', ordersData);



const DATABASE = process.env.DATABASE;
mongoose.connect(DATABASE);

const PORT = process.env.PORT || 4000;
mongoDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));











// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const CreateUser = require('./routes/createUser'); // Update the path as needed
// require("dotenv").config();
// const mongoDB = require('./db');  // Import the mongoDB function
// const app = express();



// app.get('/', (req, res) =>{
//   res.send('Hello World')
// })

// app.use(cors());
// app.use(express.json()); // To parse JSON data

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   credentials: true,
// };

// app.use(cors(corsOptions));



// app.use('/api', CreateUser);  // Ensure the routes in CreateUser are prefixed with /api

// // app.use('/api', require("./routes/createUser")); // Corrected Route Setup

// // MongoDB Connection
// const DATABASE = process.env.DATABASE;
// mongoose.connect(DATABASE)



// const PORT = process.env.PORT || 5000;
// mongoDB();

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
