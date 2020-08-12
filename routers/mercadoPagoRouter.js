//node modules
const router = require('express').Router();
const MERCADO_PAGO_ACCESS_TOKEN = process.env.MERCADO_PAGO_ACCESS_TOKEN

router.post ('/', async (req, res, next) => {

    try {
        
        if(!req.query.topic && !req.query.id)
          throw new Error("Notificacion incorrecta")
        res.status(200).send('');
        let url = ''
        switch(req.query.topic) {
          case 'payment':
            url = `https://api.mercadopago.com/v1/payments/${req.query.id}?access_token=${MERCADO_PAGO_ACCESS_TOKEN}`
            break
          case 'chargebacks':
            url = `https://api.mercadopago.com/v1/chargebacks/${req.query.id}?access_token=${MERCADO_PAGO_ACCESS_TOKEN}`
            break
          case 'merchant_order':
            url = `https://api.mercadopago.com/v1/mercant_orders/${req.query.id}?access_token=${MERCADO_PAGO_ACCESS_TOKEN}`
            break
        }
        fetch(url)
        .then(response => {
          response.json()
        })
        .then(data => {
          console.log('Success: ', data)
        })
        .catch(error => {
          console.log('Error: ', error)
          throw error
        })

    } catch(err) {
        return next(err);
    }
});

module.exports = router;