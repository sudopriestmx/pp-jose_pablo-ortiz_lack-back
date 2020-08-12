//node modules
const router = require('express').Router();
const axios = require('axios').default
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

function MercadoPago() {

  const MercadoPago = require('mercadopago')

  MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-7625462056535872-081219-c8d0619f977ab3527c9f43253bbe8b55-625046243"
  })
  return MercadoPago
}

router.post ('/', async (req, res, next) => {

    try {
      res.status(200).send('');
      console.log(req.query)
      const ipn = await MercadoPago().ipn.manage(req)
      console.log(ipn)

    } catch(err) {
        console.error(err)
    }
});

module.exports = router;