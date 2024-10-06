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
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

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
