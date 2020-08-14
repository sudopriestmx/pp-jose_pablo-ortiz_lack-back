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
      console.log(req.body)
      const payment = await MercadoPago().payment.get(req.body.data.id)
      console.log('Description: ', payment.description)
      console.log('user_id: ', payment.body.external_referece)
      console.log('amount: ', payment.body.transaction_amount)
      let mercadopago_fee = 0;
      let pack_and_pack_amount = 0
      for(let feeDetail in payment.body.fee_details) {
        switch(feeDetail.type) {
          case 'mercadopago_fee':
            mercadopago_fee = feeDetail.amount
            break
          case 'application_fee':
            pack_and_pack_amount = feeDetail.amount
            break
          case 'financing_fee':
            console.log('pago a meses por el usuario cuesta: ', feeDetail.amount)
            break
          default:
            console.log('FeeDetail Desconocido', feeDetail.amount)
        }
      }
      console.log('pack_and_pack_amount: ', pack_and_pack_amount)
      console.log('dagpacket_amount: ', payment.body.transaction_amount - mercadopago_fee - pack_and_pack_amount)
      console.log('reference: ', payment.body.id)
      console.log('created', new Date(payment.body.date_created))
    } catch(err) {
        console.error(err)
    }
});

module.exports = router;