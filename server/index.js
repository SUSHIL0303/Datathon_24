const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const authoritymodel = require('./models/Authority')
const complaintmodel = require('./models/Complaint_model')
const app = express()
require('dotenv').config({path: '../.env'});

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.REACT_APP_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch(err => {
      console.error("MongoDB connection error:", err);
    });
  
app.post("/login", (req, res) => {
        const { email, password } = req.body;
        authoritymodel.findOne({ email: email })
            .then(user => {
                if (user) {
                    if (user.password === password) {
                        res.json('Success');
                    } else {
                        res.json('The email or password is incorrect');
                    }
                } else {
                    res.json('no record found');
                }
            })
            .catch(err => {
                console.error('Error during login:', err);
                res.status(500).json('Internal server error');
            });
    });
    
app.post('/register', (req, res) => {
    console.log("Received request body:", req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }
    authoritymodel.create({ name, email, password })
        .then(authorities => res.json({ success: true, authorities }))
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "Internal server error" });
        });
});


app.post('/submitcomplaint', (req, res) => {
    const { name, phonenumber, address, distName, review, images } = req.body;
    try {
        complaintmodel.create(req.body)
            .then(complaints => {
                res.json(complaints);
            })
            .catch(err => res.json(err))
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error');
    }
});

app.get('/complaints', (req, res) => {
    complaintmodel.find({})
        .then(complaints => {
            res.json(complaints);
        })
        .catch(err => {
            console.error('Error fetching complaints:', err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
