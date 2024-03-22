const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const db = admin.firestore();

(async () => {
  await db
    .collection("todos")
    .add({
      task: "task2",
      isCompleted: false,
    })
    .then(() => {
      console.log("document successfully written!");
    })
    .catch((error) => {
      console.error("error writing document:", error);
    });
})();
