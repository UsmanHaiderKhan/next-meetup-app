import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return (
        <MeetupDetail
            image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg"
            title="First Meetup" address="Some where in the world"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum placeat temporibus voluptate. Atque debitis eaque incidunt ipsa, ipsam maxime minima nulla sapiente, sequi sunt suscipit tempore vel veniam veritatis voluptatibus!"/>

    );
}

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1',
                },
            },
            {
                params: {
                    meetupId: 'm2',
                }
            },
        ]
    }

}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    return {
        props: {
            meetupData: {
                id: meetupId,
                title: 'First Meetup',
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
                address: 'Some where in the world',
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum placeat temporibus voluptate. Atque debitis eaque incidunt ipsa, ipsam maxime minima nulla sapiente, sequi sunt suscipit tempore vel veniam veritatis voluptatibus!'
            },
        }
    }
}

export default MeetupDetails;
