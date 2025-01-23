const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const authoritymodel = require('./models/Authority')
const complaintmodel = require('./models/Complaint_model')
const app = express()

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://tamilarasand:uzMo3Zc7s0nlfMYC@authority.bai3y9l.mongodb.net/?retryWrites=true&w=majority&appName=authority")

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    authoritymodel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json('Success')
                } else {
                    res.json('The email or password is incorrect')
                }
            } else {
                res.json('no record found')
            }
        })
})
app.post('/api/register', (req, res) => {
    authoritymodel.create(req.body)
        .then(authorities => res.json(authorities))
        .catch(err => res.json(err))
})

app.post('/api/submitcomplaint', (req, res) => {
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

app.get('/api/complaints', (req, res) => {
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
