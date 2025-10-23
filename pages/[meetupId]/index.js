import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";

function MeetupDetails(props) {
    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            description={props.meetupData.description}
            address={props.meetupData.address}
        />

    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://uk47:Hm6gWspVAs98NCXM@cluster0.8r87qik.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups= await meetupsCollection.find({}, {_id: 1}).toArray();
    await client.close();
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        }))

    }

}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://uk47:Hm6gWspVAs98NCXM@cluster0.8r87qik.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetups= await meetupsCollection.findOne({_id: new ObjectId(meetupId)});
    await client.close();
    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                image: selectedMeetups.image,
                description: selectedMeetups.description,
            }
        }
    }
}

export default MeetupDetails;
