//node modules
const router = require('express').Router();
const axios = require('axios').default
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

router.post ('/', async (req, res, next) => {

    try {

      res.status(200).send('');
      console.log('MERCADOPAGO')
      let url = ''
      switch(req.query.topic) {
        case 'payment':
          url = `https://api.mercadopago.com/v1/payments/${req.query.id}?access_token=${MERCADO_PAGO_ACCESS_TOKEN}`
          break
        case 'chargebacks':
          url = `https://api.mercadopago.com/v1/chargebacks/${req.query.id}?access_token=${MERCADO_PAGO_ACCESS_TOKEN}`
          break
        case 'merchant_order':
          url = `https://api.mercadopago.com/v1/merchant_orders/${req.query.id}?access_token=${MERCADO_PAGO_ACCESS_TOKEN}`
          break
      }
      const response = await axios.get(url)
      console.log(response)

    } catch(err) {
        console.error(err)
        return next(err);
    }
});

module.exports = router;