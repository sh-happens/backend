const { request } = require("express")
const express = require("express")
const res = require("express/lib/response")
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true
  }
]

const idGenerator = ()=> {
  let maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId ++
}

// // const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'application/json' })
//   response.end(JSON.stringify(notes))
// })
app.get("/", (request, response)=> {
    response.send("<h1>hello i am alive</h1>")
})
app.get("/api/notes", (request, response)=>{
    response.json(notes)
})
app.get("/test", (request, response)=> {
    response.send("<h1>I am working</h1>")
})
app.get("/api/notes/:id", (request, response)=>{
  const id = Number(request.params.id)

  const note = notes.find(note=> note.id === id )
  if(note) {
    response.json(note)
  }else {
    response.status(404).end()
  }
})
app.delete("/api/notes/:id", (request, response)=> {
  const id = Number(request.params.id)

  notes = notes.filter((note)=> note.id !== id)
  response.status(204).end()
})

app.post("/api/notes", (request, response)=> {

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

  notes = notes.concat(note)

  response.json(note)
})  

const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

// fetching a single resource