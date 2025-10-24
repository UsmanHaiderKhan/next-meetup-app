import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

// const [loadedMeetups, setLoadedMeetups,] = useState([]);
// useEffect(() => {
//     setLoadedMeetups(DUMMY_MEETUPS);
// }, []);


function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>\
                <meta name="description" content="Browse a huge list of highly active React meetups!"/>
            </Head>
            <MeetupList meetups={props.meetups}/>
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://uk47:Hm6gWspVAs98NCXM@cluster0.8r87qik.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    await client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10
    }
}

export default HomePage;
