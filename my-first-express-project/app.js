const express = require('express')
const cors = require('cors')
const beatsRoutes = require('./routers/beatsRoutes');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json());

// Middleware pour gérer les CORS (si besoin)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Utilisation des routes définies pour les beats
app.use('/api', beatsRoutes);

app.get('/messages', (req, res) => {
  res.send('["Connection ", "between ", "back and front ", " is activated!"]')
})

app.get('/beats', (req, res) => {
  res.send(res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

