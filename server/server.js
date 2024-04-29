const express=require("express")
const cors=require("cors")
const app=express()
const bcrypt=require("bcrypt")
const{v4:uuidv4}=require("uuid")
const jwt=require("jsonwebtoken")
app.use(express.json())

app.use(cors({
    credentials:true
}))

const db=require("./db")
const port=5000
db.connect().then(()=>console.log("connected successfully")).catch(err=>console.log(err))
app.listen(port,()=>{
    console.log(`app listening on port${port}`)
})
app.get("/api/users/get",async (req,res)=>{
    try{
   const todos= await db.query("SELECT * FROM users")
   res.status(200).send(todos.rows)
}

catch(err){
console.log(err)
}

})
app.post("/api/users/signup",async(req,res)=>{
    const {email,password}=req.body
    const salt= bcrypt.genSaltSync(10)
    const hashedpassword=bcrypt.hashSync(password,salt)
    try{
      const user=await db.query("INSERT INTO users (email,hashedpassword) VALUES ($1,$2)",[email,hashedpassword])
      const token=jwt.sign({email},"secret",{expiresIn:"1hr"})
      res.json({email,token})
    }catch(err){
        res.json({detail:"Login failed"})
    }
})
app.post("/api/users/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await db.query("SELECT * from users WHERE email=$1",[email])
        console.log(user.rows)
        if(!user.rows.length)return res.json({detail:"user doesnt exist"})
      const success = await bcrypt.compare(password,user.rows[0].hashedpassword)
      const token=jwt.sign({email},"secret",{expiresIn:"1hr"})

      if(success){
        res.json({
            'email':user.rows[0].email,token
        })
       
      }
      else{
        res.json({detail:"Login failed"})
      }
    }catch(err){
        res.json({detail:"Login failed"})
    }
})
app.get("/api/posts/get/:useremail",async(req,res)=>{
try{
    const email=req.params.useremail
 const post=await db.query("SELECT * FROM posts where useremail=$1",[email])
 res.json(post.rows)
}catch(err){
    console.log(err)
}
})
app.post("/api/posts/post",async(req,res)=>{
    const {date,progress,useremail,title}=req.body
    const id=uuidv4()
    console.log(date,progress,useremail,title)
    try {
       await db.query("INSERT INTO posts (id,title,progress,date,useremail) VALUES ($1,$2,$3,$4,$5)",[id,title,progress,date,useremail])
       res.send("added successfully")
        
       
    } catch (error) {
        console.log(error)
    }
})
app.put("/api/posts/update/:postid",async(req,res)=>{
    const id=req.params.postid
    const {useremail,progress,date,title}=req.body
    try {
       await db.query("UPDATE posts SET useremail= $1 , title=$2 , progress= $3 , date = $4 WHERE id= $5",[useremail,title,progress,date,id])
       res.send("updated successfully")
    } catch (error) {
        console.log(error)
    }
})
app.delete("/api/posts/delete/:postid",async(req,res)=>{
    const id=req.params.postid
    try {
        await db.query("DELETE FROM posts where id= $1",[id])
        res.send("deleted successfully")
    } catch (error) {
        
    }
})