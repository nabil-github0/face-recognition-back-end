const handleSignup = (req,res,db,bcrypt,saltRounds) => {
    const {name, email, password} = req.body;

    if(!email.includes("@") && !email.includes(".com")) {
        return res.status(400).json("Please enter a valid email address")
    }else if(!email || !name || !password) {
        return res.status(400).json("Please enter your full credentials")
    }
    
    const hash = bcrypt.hashSync(password, saltRounds);
    db.transaction(trx => {
        trx.insert({
            hash:hash,
            email:email
        }).into("login")
        .returning("email")
        .then(loginEmail => {
            return trx("users")
            .returning("*")
            .insert({
                name:name,
                email:loginEmail[0].email,
                joined:new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' })
            }).then(user => {
                res.json(user[0]);
            })
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
              
    .catch(err => res.status(400).json("Unable to signup"))
}

export default handleSignup;