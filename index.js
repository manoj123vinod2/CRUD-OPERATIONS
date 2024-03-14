const express = require("express");
const morgan =require("morgan");


const app = new express();
app.use(morgan('dev'));
app.use(express.json());

let tasks=[];
//routes
app.get('/',(req,res)=>{
    res.json(tasks);
})
app.post('/tasks',(req,res)=>{
    tasks.push(req.body);
    res.send({message:"task added",tasks});
})
//route
app.get('/tasks/:id',(req,res)=>{
   const id =req.params.id;
   const task=tasks.find(task=>task.id===id);
   if(!task){
    res.send("task not found");
   }
   else{
    res.json(task);
   }
})


app.put('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTask=req.body;
    const index = tasks.findIndex((task)=> task.id==id);
    if(index===-1){
        res.send("task not found")}
        else{
            tasks.splice(index,1,updatedTask);
            res.json(tasks)
        }
    }
   
)
app.delete('/tasks/:id',(req,res)=>{
    const id=req.params.id;
    const updatedTask=req.body;
    const index = tasks.findIndex((task)=> task.id===id);
    if(index===-1){
        res.send("task not found")}
        else{
            tasks.splice(index,1);
            res.json(tasks)
        }
    }
   
)




app.listen(3003,(req,res)=>{
    console.log("port is up")
})
