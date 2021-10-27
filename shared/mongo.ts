import { MongoClient} from 'mongodb'

const config = {
    url: "mongodb://edutable-mongo:vfJhYFor4pVGoZqMIE1ZI0KfglH2jCyNNoSeRCI1aBPyAdixNZuYnv1VgFm5xS4azaFOUnvCAdCKhmff3U2ffQ==@edutable-mongo.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@edutable-mongo@",
    dbName: "dev"
  };
  
  async function createConnection() {
    const connection = await MongoClient.connect(config.url)
    const db = connection.db(config.dbName);
    return {
      connection,
      db
    };
  }

export { createConnection };