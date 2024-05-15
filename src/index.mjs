import express, { query } from 'express'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000;

const mockUsers  = [
    {id:1 , name: 'Ahmed' },
    {id:2 , name: 'Omar' },
    {id:3 , name: 'Ali' }
]

app.get("/" , (req, res)=>{
    res.status(201).send({msg:"Hello"})
})

// app.get('/api/users' , (req,res)=>{
//     res.send(mockUsers)
// })
app.get('/api/products' , (req , res)=>{
res.send([{
    name:'product',
    id:1,
    price:'2.5$'

}])
})
app.get('/api/users/:id' , (req , res)=>{
    console.log(req.params)
    const parsed = parseInt(req.params.id)
    console.log(parsed);
    if(isNaN(parsed)) return res.status(400).send({msg:'bad request'})
        const findUser = mockUsers.find(user=>user.id === parsed)
    if(!findUser) return res.sendStatus(404)
    return res.send(findUser)
})

app.get('/api/users', (req, res) => {
    console.log(req.query);
    const { filter, value } = req.query;

    if (filter && value) return res.send(mockUsers.filter(user => user[filter].toLowerCase().includes(value.toLowerCase())));
    return res.send(mockUsers);
});

app.post('/api/users' , (req , res)=>{
console.log(req.body);
return res.sendStatus(200)

})


app.listen(PORT, ()=>{
    console.log(`running on Port ${PORT}`);
})