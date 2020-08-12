//node modules
const router = require('express').Router();
const axios = require('axios').default
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

function MercadoPago() {

  const MercadoPago = require('mercadopago')

  MercadoPago.configurations.setAccessToken('APP_USR-7625462056535872-081219-066bac691b9747e0802b797711822fcb-625046243')

  return MercadoPago
}

router.post ('/', async (req, res, next) => {

    try {

      res.status(200).send('');
      console.log('MERCADOPAGO')
      let url = ''
      switch(req.query.topic) {
        case 'payment':
          const payment = await MercadoPago().payment.get(req.query.id)
          console.log(payment)
          break
        case 'merchant_order':
          const merchantOrder = await MercadoPago().merchant_orders.get(req.query.id)
          console.log(merchantOrder)
          break
      }

    } catch(err) {
        console.error(err)
    }
});

module.exports = router;