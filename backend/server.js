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
server.use(express.json()) //to ensure data is trasmitted as json
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

let users = db.getAllUsers()
const refreshUserList= () => {
    users =  db.getAllUsers()
}

server.listen(port, () => {
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
        const jwtToken = jwt.sign({email, first_name: user.first_name, last_name: user.last_name }, "temp")
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
        //db.addUser(first_name, last_name, email, hashedPassword) 
        refreshUserList()
        //console.log(users)
        const jwtToken = jwt.sign({email, first_name, last_name }, "temp")
        return response.status(201).send({message: "Registration Successful", token: jwtToken});
    } catch(error){
        response.status(500).send({message: error.message})
    }
})

//write site data to file
server.put("/save", async (request, response) => {
    try {
        const d = new Date()
        fs.writeFile(`./sitedata/test-site.json`, JSON.stringify(request.body.content), function(err) {
            if (err) {
                console.log(err);
            }
        })
        console.log("New file saved")
        return response.status(201).send({message: "save endpoint reached"});
    }
    catch(error){
        console.log(error.message)
        response.status(500).send({message: error.message})
    }

})

//retrieve site data from file
server.get("/load", async (request, response) => {
    try {
        await fs.readFile("./sitedata/test-site.json", "utf8")
        .then((data)=>{
            console.log("Loaded file")
            response.send(data)
        })
    }
    catch(error){
        console.log(error.message)
    }
})