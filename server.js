/* es-lint disable */
import express from 'express'
import admin from 'firebase-admin'
import cors from 'cors'
import { readFileSync } from 'fs'

const app = express()
const port = process.env.PORT || 3000

const serviceAccount = JSON.parse(
  readFileSync('./mpopovic-library-firebase-adminsdk-6eew8-93d549c6ab.json', 'utf8')
)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

app.use(cors({ origin: true }))

const db = admin.firestore()

app.get('/', (req, res) => {
  res.send('Hello from Node.js!')
})

// Get all donations from Firestore collection 'donations'
app.get('/api/donations', async (req, res) => {
  try {
    const donationsSnapshot = await db.collection('donations').get()
    const donations = donationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json(donations)
  } catch (error) {
    console.error('Error fetching donations: ', error)
    res.status(500).send('Error fetching donations')
  }
})

// Get all donations for a user with provided email from Firestore collection 'donations'
app.get('/api/donations/user/:email', async (req, res) => {
  const email = req.params.email

  try {
    const donationsSnapshot = await db.collection('donations').where('user', '==', email).get()
    const donations = donationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    res.json(donations)
  } catch (error) {
    console.error('Error fetching donations for user: ', error)
    res.status(500).send('Error fetching donations for user')
  }
})

// Get all registered users from Firestore
app.get('/api/users', async (req, res) => {
  try {
    const users = []
    const listUsersResult = await admin.auth().listUsers(100)
    listUsersResult.users.forEach((userRecord) => {
      users.push(userRecord.email)
    })
    res.json(users)
  } catch (error) {
    console.error('Error fetching users: ', error)
    res.status(500).send('Error fetching users')
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
