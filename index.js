import express from 'express'
import { generateUploadURL } from './s3.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

app.get('/s3Url', async (req, res) => {  
  const url = await generateUploadURL( req.query.name )
  res.send({url})
})

app.listen(PORT, () => console.log("listening on port 8080"))
