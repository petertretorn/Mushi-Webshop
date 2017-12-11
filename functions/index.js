const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(SENDGRID_API_KEY);

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
