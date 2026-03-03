const Stripe = require("stripe")
const stripe = new Stripe(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500, // $5.00
    currency: "usd",
  })

  res.json({ clientSecret: paymentIntent.client_secret })
}