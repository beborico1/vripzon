const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

export default async (req,res) => {
    const { items, email } = req.body;

    const transformedItems = items.map(item => ({
            price_data: {
              currency: 'mxn',
              product_data: {
                name: item.title,
                description: item.description,
                images: [item.image],
              },
              unit_amount: item.price * 100,
            },
            quantity: 1,
        }
    ))

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["MX","GB","US","CA"]
        },
        shipping_options: [{
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'mxn',
              },
              display_name: 'Envío GRATIS',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 3,
                },
              }
            }
          }],
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.image))
        }
    })

    res.status(200).json({id:session.id})
}