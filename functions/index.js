const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

const stripe = require('stripe')(functions.config().stripe.testkey)

exports.stripeCharge = functions.firestore
  .document('/payments/{userId}/{paymentId}')
  .onCreate(event => {
    const payment = event.data.data()
    const userId = event.params.userId;
    const paymentId = event.params.paymentId;

    // checks if payment exists or if it has already been charged
    if (!payment || payment.charge) return;

    return admin.firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then(doc => {
        console.log('got data: ' + data.displayName)
        return doc.data();
      })
      .then(customer => {
        const amount = payment.amount;
        const idempotency_key = paymentId; // prevent duplicate charges
        const source = payment.token.id;
        const currency = 'dkk';
        const charge = {
          amount,
          currency,
          source
        };
        return stripe.charges.create(charge, {
          idempotency_key
        });
      })
      .then(charge => {
        admin.firestore()
          .doc(`/payments/${userId}/${paymentId}/charge`)
          .set(charge)
      })
  });


exports.firestoreEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate(event => {
    const orderId = event.params.orderId;
    const order = event.data.data();
    const msg = {
      to: order.shipping.recipientMail,
      from: 'chagabear@gmail.com',
      subject: 'Din Mushi Mushi ordre',
      templateId: '7f9d55d7-311e-4287-b0c7-c3cb03686560',
      substitutionWrappers: ['{{', '}}'],
      substitutions: {
        name: order.shipping.fullName
      }
    };
    sgMail.send(msg)

    console.log(`confirm mail sent for order: ${orderId}`)
    console.log(`name: ${order.shipping.fullName}`)
    console.log(`e-mail: ${order.shipping.recipientMail}`)
  });
