const { request } = require("express")
const express = require("express")
const res = require("express/lib/response")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

const games = [
    {
      "id": 1,
      "title": "Valorant",
      "image": "images/Valorant.jpg",
      "avatar": true
    },
    {
      "id": 2,
      "title": "Fortnite",
      "image": "images/Fortnite.jpg",
      "avatar": false
    },
    {
      "id": 3,
      "title": "Apex Legends",
      "image": "images/Apex-Legends.jpg",
      "avatar": true
    }
  ]


const idGenerator = ()=> {
  let maxId = games.length > 0 ? Math.max(...games.map(n => n.id)) : 0
  return maxId ++
}

// // const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(games))
// })
app.get("/", (request, response)=> {
    response.send("<h1>hello i am alive</h1>")
})
app.get("/api/games", (request, response)=>{
    response.json(games)
})
app.get("/test", (request, response)=> {
    response.send("<h1>I am working</h1>")
})
app.get("/api/games/:id", (request, response)=>{
  const id = Number(request.params.id)

  const note = games.find(note=> note.id === id )
  if(note) {
    response.json(note)
  }else {
    response.status(404).end()
  }
})
app.delete("/api/games/:id", (request, response)=> {
  const id = Number(request.params.id)

  games = games.filter((note)=> note.id !== id)
  response.status(204).end()
})

app.post("/api/games", (request, response)=> {

  const body = request.body

  if(!body.content){
    return response.status(400).json({error:"content missing"})
  }
  
  const note = {
    id: idGenerator(),
    content: body.content,
    date: new Date(),
    important: body.important || false
  }

  games = games.concat(note)

  response.json(note)
})  


// const requestLog = (request, response, next)=> {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }

// app.use(requestLog())

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

// fetching a single resource