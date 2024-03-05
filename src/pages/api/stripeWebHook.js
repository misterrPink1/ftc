import dbConnect from '../../lib/dbConnect'
import User from '../../models/Users'
import { buffer } from "micro";

export const config = {
    api: {
      bodyParser: false,
    },
  };

export default async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end();
    console.log("web hook update notification received")
    
    try {
        
        //check endpoint secret before even doing anything else 
        console.log("checking endpoint secret")
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        let event

        if (endpointSecret) {
            try {
                //console.log("req: ", req)
                const rawBody = await buffer(req)
                const sig = req.headers['stripe-signature'];
                event = stripe.webhooks.constructEvent(
                    rawBody.toString(),
                    sig,
                    endpointSecret
                );
            } catch (err) {
                console.log(`⚠️  Webhook signature verification failed.`, err.message);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }
        }

        console.log("Endpoint chack completed")

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                if(session.amount_total === 2999){
                    const email = session.customer_details.email || session.customer_email;
                    const name = session.customer_details.name || session.name;
                    const amount = session.amount_total;
                    await updateUserSubscription(email, name, amount);
                    console.log("User updated")
                    res.status(200).send({ done: true });
                    return
                    }
                else{
                    throw new Error("Not a Lychee session");
                }                
            // You can add more cases as needed...
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }        
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).send(error.message);
    }
}


async function updateUserSubscription(email, name, amount) {
    await dbConnect()

    let user = await User.findOne({ email: email })
    console.log("user search: ", user)
    if (!user) {
        user = await User.create({
                name: name,
                email: email,
                amount: amount,
                lifetimeMember: true,
                token: 777.777,
                confirmedAt: new Date(),
                lastLoginAt: new Date(),
            });
    } else {
        // User found in the database            
        await User.findByIdAndUpdate(user._id, { name: name, paymentTotal: amount, lifetimeMember: true, token: 777.777, confirmedAt: new Date()});
    }
}
