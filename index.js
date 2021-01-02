const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51I3kunFu9JpJ9qGKCgismOhWAJVrlz2Ztl907wtexMOuFdr5AIhBKVZDJ77fAVcaAM472KhI3xyKZmg0Jlrbq8Vp00okyt7poe');

//API
// - App config
const app = express();
// - Middlewares
app.use(cors());
app.use(express.json());
// - API Routes
app.get('/', (request, response) =>
    response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment request Received BOOM!! for this amount: ', total)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    });
    // OK- Created
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})
// - Listen command
exports.api = functions.https.onRequest(app)
//Example Endpoint
//http://localhost:5001/e-clone-ad92b/us-central1/api
