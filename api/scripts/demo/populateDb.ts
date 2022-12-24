import cli from 'cli-color';
import mongoose from 'mongoose';
import readline from 'readline';
import { Customers } from '../../models/Customers';
import { d1, D1, D2 } from '../../models/d1';
import { User } from '../../models/User';

//--------
import customersData from './data/customers.json';
import d1Data from './data/d1.json';
import d2Data from './data/d2.json';
import usersData from './data/users.json';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/demo-data-gerome-3', options as any);
  console.log(cli.green('[Running]: Database successfully connected'));
};

const userInput = (query: any) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve =>
    rl.question(query, ans => {
      rl.close();
      resolve(ans);
    })
  );
};

(async () => {
  try {
    const ans = (await userInput(cli.blueBright('Are you sure you want to insert demo data, it will clear all existing records? y/n'))) as string;

    if (ans.toLowerCase() !== 'y') {
      throw new Error('permission denied');
    }

    await connectDB();
    console.log(cli.yellow('[Process]: clearing database'));
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    collections
      .map((collection: any) => collection.name)
      .forEach(async (collectionName: any) => {
        db.dropCollection(collectionName);
      });

    console.log(cli.yellow(`[Process]: Inserting demo data in ${db.databaseName} database`));
    for (let i = 0; i < 10; i++) {
      const userEntry = await User.create(usersData[i]);
      for (let j = 5 * i; j < 5 * i + 5; j++) {
        const customerEntry = await Customers.create({...customersData[j], adminId: userEntry.toJSON()._id.toString()});
        for (let k = 2 * j; k < 2 * j + 2; k++) {
          await d1.create({
            ...d1Data[k],
            adminId: userEntry.toJSON()._id.toString(),
            customerId: customerEntry.toJSON()._id.toString(),
            type: D1
          });

          await customerEntry.update({$inc: {['totalToTake']: d1Data[k].amount}});

          await d1.create({
            ...d2Data[k],
            adminId: userEntry.toJSON()._id.toString(),
            customerId: customerEntry.toJSON()._id.toString(),
            type: D2
          });

          await customerEntry.update({$inc: {['totalToGive']: d2Data[k].amount}});
        }
      }
    }
    console.log(cli.blueBright('[Success]: Successfully inserted demo data'));
    process.kill(process.pid, 'SIGTERM');
  } catch (error) {
    console.log(cli.red('[Error]: In inserting demo data', error));
  }
})();
