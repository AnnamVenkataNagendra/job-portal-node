
import express from 'express'
import {register} from '../Servicelayer/auth.js';
import { userlogin } from '../Servicelayer/auth.js';
import { verifyToken } from '../Middleware/authmiddleware.js';
const router=express.Router();

// post request
router.post("/post", (req, res)=>{
register(req.body.name, req.body.email,
 req.body.password, req.body.role || candidate)
 .then((result)=>{
    res.status(200).json({
        message: result
    })
 })
 .catch((err) => {
    res.status(500).json({
        message: err
    });
});
})

// login request
router.post("/login", (req, res)=>{
userlogin(req.body.email, req.body.password)
.then((result)=>{
    res.status(200).json({
        success: result
    })
}).catch((err)=>{
        res.status(401).json({
        message: err
    })
})
})

// protected api
router.get('/fetch',verifyToken,(req, res)=>{
    res.status(200).json({
        "Access": 'you are allowd to access',
        "Message": 'protected api'
    })
})


export default router;
