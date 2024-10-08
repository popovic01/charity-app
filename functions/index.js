/* es-lint disable */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "mimica2001@gmail.com",
    pass: "sitr uztd cevc idbl",
  },
});

admin.initializeApp();

exports.getAllUsers = functions.https.onCall(async (data, context) => {
  try {
    const users = [];
    const listUsersResult = await admin.auth().listUsers(100);
    listUsersResult.users.forEach((userRecord) => {
      const userEmail = userRecord.email;
      if (userEmail !== "admin@example.com") {
        users.push({email: userEmail});
      }
    });
    return {users};
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new functions.https.HttpsError("internal", "Unable to retrieve users");
  }
});

exports.recieveDonation = functions.firestore
    .document("donations/{donationId}")
    .onCreate((snap, context) => {
      const newDonation = snap.data();

      const mailOptions = {
        from: "ebcentre@gmail.com",
        to: "mimica2001@gmail.com",
        subject: "New Donation Received",
        text: `A new donation has been received for the Indigenous Health Hub Foundation.
        Amount: ${newDonation.amount}$.
        Login as admin and visit the Admin Dashboard page to review the donation:
        https://charity-app-nu.vercel.app/sign-in`,
      };

      return transporter.sendMail(mailOptions)
          .then(() => {
            console.log("Email sent successfully");
          })
          .catch((error) => {
            console.error("Error sending email:", error);
          });
    });

exports.retrieveDonations = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const donationsCollection = admin.firestore().collection("donations");
      const snapshot = await donationsCollection.get();
      const donations = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      res.status(200).send({donations});
    } catch (err) {
      console.error("Error retrieving donations: ", err.message);
      res.status(500).send("Error retrieving donations");
    }
  });
});
