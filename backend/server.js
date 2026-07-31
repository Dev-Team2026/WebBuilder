import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import Database from 'better-sqlite3'
import bcrypt from 'bcrypt'
import * as db from './dbFunctions.js'
import nodeMailer from 'nodemailer'
import 'dotenv/config';
import validate from 'deep-email-validator'
import fs from 'fs/promises'

//Express
const server = express()
const port = 3000
const {EMAIL_PASSWORD, EMAIL_USER} = process.env

//Middleware
server.use(express.json()) //to ensure data is transmitted as json
server.use(express.urlencoded({ extended: true })) //to ensure data is encoded and decoded while transmission
server.use(cors())

const sendEmail = async (email)=>{
    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD
        },
        tls: { //Before full deployment, remember to supply the root Certificate Authority (CA)
            rejectUnauthorized: false
        }
    })
    try {
        const info = await transporter.sendMail({
          from: EMAIL_USER,
          to: email,
          subject: 'Registration Complete',
          text: 'Thank you for registering'
        })
        //console.log(info)
    } catch (error) {
        console.log(error)
    }
}

//close db connection on shutdown
process.on('exit', () => {return db.close()})
//catches "interrupt signal" (ctrl + C)
process.on('SIGINT', () => {
    db.close()
    process.exit()
})

server.post("/websites", (req, res) => {
    const { user_id, website_name, website_data } = req.body;

    try {
        const result = db.addWebsite(
            user_id,
            website_name,
            JSON.stringify(website_data)
        );

        res.status(201).json({
            message: "Website created",
            website_id: result.lastInsertRowid
        });

    } catch(error) {
        console.log(error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

server.get("/websites/:user_id", (req, res) => {
    try {
        const websites = db.getWebsitesByUser(req.params.user_id);

        res.json(websites);

    } catch(error) {
        console.log(error.message);

        res.status(500).json({
            message: error.message
        });
    }
});

server.get("/websites/data/:id", (req, res) => {
    try {
        const website = db.getWebsiteById(req.params.id);

        if (!website) {
            return res.status(404).json({
                error: "Website not found"
            });
        }

        res.json(website);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
});

let users = db.getAllUsers()
const refreshUserList= () => {
    users =  db.getAllUsers()
}

server.listen(port, "0.0.0.0", () => {
      console.log(`Database is connected\nServer is listening on ${port}`)
      console.log(new Date(Date.now()))
    });

server.get("/", (request, response) => {
    console.log("main endpoint")
    response.send("Server is Live!")
});

server.post("/", async(request, response) => {
    const {email, password} = request.body
    try{
        //const user = await User.findOne({name});
        const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
        //console.log(user)
        if (!user){
            return response.status(404).send({message: "User does not exist"})
        }
        const match = await bcrypt.compare(password, user.password);
        //const match = password === user.password
        //console.log(match)
        if (!match)
        {
            return response.status(403).send({message: "Incorrect credentials"})
        }
        const jwtToken = jwt.sign({user_id: user.user_id, email: user.email, first_name: user.first_name, last_name: user.last_name }, "temp")
        return response.status(201).send({message: "User Authenticated", token: jwtToken})
    }catch(err){
        response.status(500).send({message: err.message})
    }
})

server.post("/users", async (request, response) => {
    const {first_name, last_name, email, password} = request.body
    //console.log(first_name, last_name, email, password)
    try {
        //console.log(users)
        const user = users.length > 0 ? users.find(user => user.email.toLowerCase() === email.toLowerCase()) : false
        //console.log(user)
        if (user){
            return response.status(403).send({message: "This email is already in use"})
        }
        const res = await validate(email);
        if (!res.valid) {
            console.log(`The address is invalid. Reason: ${res.reason}`);
            return response.status(404).send({message: "This email doesn't exist"})
        }

        await sendEmail(email)
        const hashedPassword = await bcrypt.hash(password, 10)
        //console.log(hashedPassword)
        const result = db.addUser(first_name, last_name, email, hashedPassword)
        refreshUserList()
        //console.log(users)
        const jwtToken = jwt.sign({user_id: result.lastInsertRowid, email, first_name, last_name }, "temp")
        return response.status(201).send({message: "Registration Successful", token: jwtToken});
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

server.post("/google-login", async (request, response) => {
    const { first_name, last_name, email } = request.body;

    try {
        let user = users.find(
            user => user.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {

            const hashedPassword = await bcrypt.hash(
                "GoogleSignUp",
                10
            );

            const result = db.addUser(
                first_name,
                last_name,
                email,
                hashedPassword
            );

            refreshUserList();

            user = users.find(
                user => user.email.toLowerCase() === email.toLowerCase()
            );
        }

        const jwtToken = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name
            },
            "temp"
        );

        return response.status(201).send({
            message: "Google Login Successful",
            token: jwtToken
        });

    } catch(error) {
        console.log(error);
        return response.status(500).send({
            message: error.message
        });
    }
});

//write site data to file
server.put("/websites/:id", (req, res) => {
    const result = db.updateWebsiteData(
        req.params.id,
        req.body.website_data
    );

    res.json({
        message: "Website saved"
    });
});
