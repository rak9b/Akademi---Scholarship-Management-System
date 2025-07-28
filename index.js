require('dotenv').config()
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SC_KEY);

// Middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wwjbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db("Akademi");
        const scholarshipsCollection = database.collection("Scholarships");
        const userCollection = database.collection('Users')
        const reviewCollection = database.collection('Reviews')
        const applicationCollection = database.collection('Application')

        // verify admin 
        const verifyAdmin = async (req, res, next) => {
            const user = await userCollection.findOne({ userEmail: req.query.email });
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }

        // verify authorization
        const verifyAuthorization = async (req, res, next) => {
            const user = await userCollection.findOne({ userEmail: req.query.email });
            const isAuthorized = user?.role === 'admin' || user?.role === 'moderator';
            if (!isAuthorized) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }



        //////// user related //////// 

        app.post('/create-user', async (req, res) => {
            const data = req.body
            const query = { userEmail: data.email }
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null })
            }
            const result = await userCollection.insertOne({ userName: data.displayName, userEmail: data.email, role: 'user' })
            res.send(result)
        })

        app.get('/users/:email', async (req, res) => {
            const result = await userCollection.findOne({ userEmail: req.params.email })
            res.send(result)
        })

        app.get('/all-users', verifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })

        app.delete('/delete-user/:id', verifyAdmin, async (req, res) => {
            const id = req.params.id
            const result = await userCollection.deleteOne({ _id: new ObjectId(req.params.id) })
            res.send(result)
        })

        app.patch('/update-role/:id', verifyAdmin, async (req, res) => {
            const id = req.params.id
            const role = req.query.role
            const result = await userCollection
                .updateOne({ _id: new ObjectId(id) }, { $set: { role: role } })
            res.send(result)
        })


        //////// data related //////// 

        // get data for home page based on lowest application fee and recently added
        app.get('/', async (req, res) => {
            const result = await scholarshipsCollection.find().sort({ $natural: -1 }).sort({ applicationFees: 1 }).limit(6).toArray()
            res.send(result)
        })

        // get all data 
        app.get('/all-data', async (req, res) => {
            const result = await scholarshipsCollection.find().toArray()
            res.send(result)
        })

        app.get('/scholarship/:id', async (req, res) => {
            const result = await scholarshipsCollection.aggregate([
                {
                    $match: { _id: new ObjectId(req.params.id) }
                },
                {
                    $lookup: {
                        from: 'Reviews',
                        localField: '_id',
                        foreignField: 'postId',
                        pipeline: [
                            { $sort: { _id: -1 } }
                        ],
                        as: 'reviews'
                    }
                }
            ]).toArray()
            res.send(result)
        })

        app.post('/add-scholarship', verifyAuthorization, async (req, res) => {
            const data = req.body
            const result = await scholarshipsCollection.insertOne(data)
            res.send(result)
        })

        app.delete('/delete-scholarship/:id', verifyAuthorization, async (req, res) => {
            const id = req.params.id
            const result = await scholarshipsCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(result)
        })

        app.patch('/update-scholarship/:id', verifyAuthorization, async (req, res) => {
            const id = req.params.id
            const data = req.body
            const result = await scholarshipsCollection.updateOne({ _id: new ObjectId(id) }, { $set: data })
            res.send(result)
        })

        app.get('/all-collections-data', async (req, res) => {
            const scholarships = await scholarshipsCollection.find().toArray()
            const users = await userCollection.find().toArray()
            const reviews = await reviewCollection.find().toArray()
            const application = await applicationCollection.find().toArray()
            const result = [scholarships, users, reviews, application]
            res.send(result)
        });


        //////// review related ////////

        app.post('/add-review/:id', async (req, res) => {
            const id = req.params.id
            const review = req.body
            const result = await reviewCollection.insertOne({ postId: new ObjectId(id), ...review })
            res.send(result)
        })

        app.get('/get-reviews/:id', async (req, res) => {
            const id = req.params.id
            const result = await reviewCollection.find({ postId: id }).toArray()
            res.send(result)
        })

        app.get('/my-review/:id', async (req, res) => {
            const id = req.params.id
            const result = await reviewCollection.find({ userid: id }).toArray()
            res.send(result)
        })

        app.get('/all-reviews', verifyAuthorization, async (req, res) => {
            const result = await reviewCollection.find().sort({ $natural: -1 }).toArray()
            res.send(result)
        })

        app.delete('/delete-review/:id', async (req, res) => {
            const id = req.params.id
            const result = await reviewCollection.deleteOne({ _id: new ObjectId(id) })
            res.send(result)
        })

        app.patch('/update-review/:id', async (req, res) => {
            const result = await reviewCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            res.send(result)
        })

        //////// application related ////////

        app.get('/all-application', verifyAuthorization, async (req, res) => {
            const result = await applicationCollection.find().toArray()
            res.send(result)
        })

        app.get('/my-application', async (req, res) => {
            const userId = req.query.userId
            const result = await applicationCollection.find({ userId: userId }).sort({ $natural: -1 }).toArray()
            res.send(result)
        })

        app.post('/add-application', async (req, res) => {
            const data = req.body
            const result = await applicationCollection.insertOne(data)
            res.send(result)
        })


        app.delete('/delete-application/:id', async (req, res) => {
            const result = await applicationCollection.deleteOne({ _id: new ObjectId(req.params.id) })
            res.send(result)
        })

        app.patch('/update-application/:id', async (req, res) => {
            const result = await applicationCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            res.send(result)
        })

        // app.patch('reject-application/:id', verifyAuthorization, async (req, res) => {
        //     const result = await applicationCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
        //     res.send(result)
        // })

        app.patch('/update-feedback/:id', verifyAuthorization, async (req, res) => {
            const result = await applicationCollection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            res.send(result)
        })


        // payment gateway
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100)

            try {
                const paymentIntent = await stripe.paymentIntents.create({
                    amount,
                    currency: 'usd',
                    payment_method_types: ['card'],
                });

                res.send({
                    clientSecret: paymentIntent.client_secret,
                });
            } catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        // payment gateway

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});