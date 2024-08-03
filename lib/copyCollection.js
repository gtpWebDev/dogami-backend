const { MongoClient } = require("mongodb");

async function copyCollection(
  sourceUri,
  sourceDb,
  sourceCollection,
  targetUri,
  targetDb,
  targetCollection
) {
  const sourceClient = new MongoClient(sourceUri, { useUnifiedTopology: true });
  const targetClient = new MongoClient(targetUri, { useUnifiedTopology: true });

  try {
    await sourceClient.connect();
    await targetClient.connect();

    const sourceDatabase = sourceClient.db(sourceDb);
    const targetDatabase = targetClient.db(targetDb);

    const documents = await sourceDatabase
      .collection(sourceCollection)
      .find()
      .toArray();
    if (documents.length > 0) {
      await targetDatabase.collection(targetCollection).insertMany(documents);
      console.log(
        `Copied ${documents.length} documents from ${sourceDb}.${sourceCollection} to ${targetDb}.${targetCollection}`
      );
    } else {
      console.log("No documents found in the source collection.");
    }
  } finally {
    await sourceClient.close();
    await targetClient.close();
  }
}

const sourceUri = "mongodb+srv://admin:<PASSWORD>@cluster0.fcjfpao.mongodb.net";
const targetUri = "mongodb+srv://admin:<PASSWORD>@cluster0.fcjfpao.mongodb.net";
const sourceDb = "dogami_app_dev";
const sourceCollection = "dogami_images";
const targetDb = "dogami_app_prod";
const targetCollection = "dogami_images";

copyCollection(
  sourceUri,
  sourceDb,
  sourceCollection,
  targetUri,
  targetDb,
  targetCollection
).catch(console.error);
