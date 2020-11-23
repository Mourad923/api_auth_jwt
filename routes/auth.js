const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Knex = require('knex')
const knexConfig = require('../db/knexfile.js')
const { Model, val } = require('objection')
const User = require('../model/User.js')
const knex = Knex(knexConfig.development)
const dotenv = require('dotenv')

const {registerValidation , loginValidation} = require('../validation.js')

dotenv.config()
Model.knex(knex)


router.post('/register', async (req,res) => {
        //validate the data with joi
        const { error } = registerValidation(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        //checking if the user is already in database
        const emailExist = await User.query().findOne({email: req.body.email})
        if(emailExist) return res.status(400).send('Email already exist')
        
        //hash passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        
        //create new user
        const user = await User.query().insert({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword

          });

        // const user = await User.query()

        try {
            const savedUser = await user.save()
            res.json({user:user.id})
            // res.send('bien enregistrer')
        } catch (err) {
            res.status(400).send(err)
            
        }


})


//LOGIN

router.post('/login', async (req,res) => {

    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

      //checking if the user is already in database
      const user = await User.query().findOne({email: req.body.email})
      if(!user) return res.status(400).send('Email is wrong')
      //password is correct
      const validPass = await bcrypt.compare(req.body.password,user.password)
      if(!validPass) return res.status(400).send('Invalid Password')
      
      //create and assign a token

      const token = jwt.sign({id:user.id}, process.env.TOKEN_SECRET)
      res.header('auth-token', token).send(token)
      res.send('Logged in')
})


module.exports = router