import { MongoClient } from 'mongodb';

 async  function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        // const { title, image, address, description } = data;
        const client = await MongoClient.connect('mongodb+srv://uk47:Hm6gWspVAs98NCXM@cluster0.8r87qik.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
        const db = client.db();
        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        await client.close();
        res.status(201).json({ message: 'Meetup inserted!' });
    }
}
export default handler;
