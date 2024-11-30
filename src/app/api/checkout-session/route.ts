import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Ensure the secret key is available
if (!process.env.STRIPE_SECRET) {
  throw new Error("STRIPE_SECRET is not set in environment variables.");
}

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Your logic here for handling the POST request
    const { products } = req.body;

    const lineItems = [];

    for (const item of products) {
      const existingProduct = await stripe.products.list({
        limit: 100,
        expand: ["data.default_price"],
      });

      const product = existingProduct.data.find((p) => p.name === item.title);

      if (product) {
        const defaultPrice = product.default_price;

        if (!defaultPrice) {
          throw new Error(
            `Product ${item.title} does not have a default price.`
          );
        }

        const priceId =
          typeof defaultPrice === "string" ? defaultPrice : defaultPrice.id;

        lineItems.push({
          price: priceId,
          quantity: item.quantity,
        });
      } else {
        const stripeProduct = await stripe.products.create({
          name: item.title,
          description: item.description,
          images: [item.imageUrl],
        });

        const price = await stripe.prices.create({
          unit_amount: Math.round(item.price * 100), // Convert price to cents
          currency: "usd",
          product: stripeProduct.id,
        });

        lineItems.push({
          price: price.id,
          quantity: item.quantity,
        });
      }
    }

    try {
      // Inside your handler for /api/checkout-session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
      });

      res.status(200).json({ id: session.id }); // Make sure you're sending a valid JSON response
    } catch (err) {
      console.error("Error creating checkout session:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {});

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const { cartItems } = req.body;

//       if (!cartItems || cartItems.length === 0) {
//         return res.status(400).json({ error: "Cart items are missing" });
//       }

//       const line_items = cartItems.map(
//         (item: { title: string; price: number; quantity: number }) => ({
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: item.title,
//             },
//             unit_amount: item.price * 100,
//           },
//           quantity: item.quantity,
//         })
//       );

//       // Create a Checkout Session with the items
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: line_items,
//         mode: "payment",
//         success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`, // Redirect on successful payment
//         cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`, // Redirect if payment is canceled
//       });

//       // Respond with the session id
//       res.status(200).json({ id: session.id });
//     } catch (error) {
//       // Handle the error by narrowing the type of the 'error' variable
//       if (error instanceof Error) {
//         res.status(500).json({ error: error.message });
//       } else {
//         res.status(500).json({ error: "An unknown error occurred" });
//       }
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// src/pages/api/checkout-session.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// // Ensure environment variables are defined
// if (!process.env.STRIPE_SECRET) {
//   throw new Error("STRIPE_SECRET is not set in environment variables.");
// }

// if (!process.env.NEXT_PUBLIC_BASE_URL) {
//   throw new Error("NEXT_PUBLIC_BASE_URL is not set in environment variables.");
// }

// // Initialize Stripe with API version
// const stripe = new Stripe(process.env.STRIPE_SECRET, {
//   apiVersion: process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion,
// });

// interface Product {
//   name: string;
//   image: string;
//   price: number;
//   quantity: number;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "POST") {
//     try {
//       const { products }: { products: Product[] } = req.body;

//       // Validate the request body
//       if (!products || !Array.isArray(products) || products.length === 0) {
//         return res
//           .status(400)
//           .json({ error: "Products list is invalid or empty." });
//       }

//       const lineItems = products.map((product) => {
//         if (
//           !product.name ||
//           !product.image ||
//           product.price <= 0 ||
//           product.quantity <= 0
//         ) {
//           throw new Error("Invalid product data.");
//         }
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: product.name,
//               images: [product.image],
//             },
//             unit_amount: Math.round(product.price * 100), // Convert price to cents
//           },
//           quantity: product.quantity,
//         };
//       });

//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//       });

//       res.status(200).json({ id: session.id });
//     } catch (error) {
//       console.error("Error creating Stripe session:", error);
//       res.status(500).json({
//         error: "Failed to create checkout session",
//         details: error instanceof Error ? error.message : "Unknown error",
//       });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
