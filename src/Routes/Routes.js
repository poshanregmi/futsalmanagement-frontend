// import express from "express";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-11-15",
// });
// const router = express.Router();

// router.post("/create-checkout-session", async (req, res) => {
//   try {
//     const { products } = req.body;

//     const lineItems = products.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.name,
//           images: [product.image],
//         },
//         unit_amount: Math.round(product.price * 100),
//       },
//       quantity: product.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.BASE_URL}/success`,
//       cancel_url: `${process.env.BASE_URL}/cancel`,
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating checkout session." });
//   }
// });

// export default router;
