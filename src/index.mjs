import express, { query, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, name: "Ahmed", userName: "ahmed" },
  { id: 2, name: "Omar", userName: "omar" },
  { id: 3, name: "Ali", userName: "ali" },
];

// get

app.get("/", (req, res) => {
  res.status(201).send({ msg: "Hello" });
});

// app.get('/api/users' , (req,res)=>{
//     res.send(mockUsers)
// })
app.get("/api/products", (req, res) => {
  res.send([
    {
      name: "product",
      id: 1,
      price: "2.5$",
    },
  ]);
});
app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parsed = parseInt(req.params.id);
  console.log(parsed);
  if (isNaN(parsed)) return res.status(400).send({ msg: "bad request" });
  const findUser = mockUsers.find((user) => user.id === parsed);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const { filter, value } = req.query;

  if (filter && value)
    return res.send(
      mockUsers.filter((user) =>
        user[filter].toLowerCase().includes(value.toLowerCase())
      )
    );
  return res.send(mockUsers);
});

// post
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };

  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

// put
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (parsedId === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { id: parsedId, ...body };
  console.log(mockUsers[findUserIndex]);
  return res.sendStatus(200);
});

//patch
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers.splice(findUserIndex, 1);
  res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`running on Port ${PORT}`);
});
