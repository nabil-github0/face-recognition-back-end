import express from "express";
import bcrypt from 'bcrypt';
import cors from "cors";
import knex from 'knex';
import {ClarifaiStub, grpc} from "clarifai-nodejs-grpc";
import handleSignup from "./Controllers/handleSIgnup.js";
import handleSIgnin from "./Controllers/handleSignin.js";
import handleImage from "./Controllers/handleImage.js";
import handleProfile from "./Controllers/handleProfile.js";
import handleImageURL from "./Controllers/handleImageURL.js";

const PORT = process.env.PORT || 3000;
const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res) => {
    return res.json("Lol");
})

app.post("/signin", (req,res) => {handleSIgnin(req,res,db,bcrypt)})

app.post("/signup", (req, res) => {handleSignup(req,res,db,bcrypt,saltRounds)})

app.get("/profile/:id", (req,res) => {handleProfile(req,res,db)})

app.put("/image", (req,res) => {handleImage(req,res,db)})

app.post("/imageURL", (req,res) => {handleImageURL(req,res,ClarifaiStub,grpc)})

app.listen(PORT ,() => {
    console.log(`app is runnig on port ${PORT}`)
})