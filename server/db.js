const {Client}=require("pg")
const client=new Client({
    host:'localhost',
    user:"postgres",
    port:5432,
    database:"todo",
    password:"root"
})
module.exports=client