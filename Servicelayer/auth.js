
import bcrypt from 'bcrypt'
import con from "../DbConnection/dbcon.js"
import jwt from 'jsonwebtoken'

// Register user form
export const register = async (userName, userEmail, userPassword,userRoles) => {
    const errors = {};

    if (!userName || !userName.trim()) {
        errors.userName = "Name is required";
    }

    if (!userEmail || !userEmail.trim()) {
        errors.userEmail = "Email is required";
    }

    if (!userPassword || !userPassword.trim()) {
        errors.userPassword = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    return new Promise((resolve, reject) => {
        con.query(
            'SELECT * FROM users WHERE email = ?',
            [userEmail],
            async (err, result) => {
                if (err) {
                     reject(err);
                }
               if (result.length > 0) {
                 resolve({
                    message: {
                    email: "Email already exists"
                   }
                  });
                 }
                try {
                    const hashedPassword = await bcrypt.hash(userPassword, 10);
                    con.query(
                        "INSERT INTO users (name, email, password,role) VALUES (?, ?, ?, ?)",
                        [userName, userEmail, hashedPassword,userRoles],
                        (err, result) => {
                            if (err) {
                                 reject(err);
                            }
                             resolve({
                                message: "User registered successfully!",
                                  userId: result.insertId
                             })
                        }
                    );
                } catch (error) {
                     reject(error);
                }
            }
        );
    });
};


// login user
export const userlogin=async(email, password)=>{

    const messages={}
   if (!email || !email.trim()) {
    messages.email = "Email is required";}

if (!password || !password.trim()) {
    messages.password = "Password is required";}
    
    if (Object.keys(messages).length > 0) {
        return { messages };
    }

   return new Promise((reslove, reject)=>{
     con.query('SELECT * FROM users WHERE email= ?',[email], async(err, result)=>{
        if(err){
            reject({
                errors: "Database error"
            })}

            if(result.length === 0){
            reject({
               errors: "Invalid email"
            })}
        
        const user=result[0];
        const isMatch = await bcrypt.compare(password, user.password);   
            if(isMatch==null)
            {
             reject({
               errors: "Invalid password"
            })
            }

            const token=jwt.sign({
                id: user.id,
                userName: user.name,
                userRole: user.role
            },
            process.env.JWT_TOKEN,
            {expiresIn:'1d'})
            reslove({
                message: "User login successful",
                token,
                user: {
                 id: user.id,
                 name: user.name,
                 email: user.email,
                 role: user.role
                }
            })

    })
   })
}