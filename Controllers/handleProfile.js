const handleProfile = (req,res,db) => {
    const {id} = req.params;
    db.select("*").from("users").where({
        id:id
    }).then(data =>{
        if(data.length) {
            return res.json(data[0])
        }else {
            res.status(404).json("Not found")
        }
    }).catch(err => res.status(404).json("error founding user"))
}

export default handleProfile;