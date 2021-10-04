import Hero from '../rsvp/Hero';
import Description from '../rsvp/Description';
import RsvpSection from '../rsvp/RsvpSection';
import {useState, useEffect} from 'react';
import Spinner from './Spinner';
import {ClientEvent} from '../../types';
const EventPage = ({
  event,
}: {
  event?: string | string[] | undefined
}) => {
  // call api here, pass data to children
  const [loading, setLoading] = useState<boolean>(false);
  const [eventDetails, setEventDetails] = useState<ClientEvent>({
    title: '',
    description: '',
    proposerName: '',
    sessionCount: 0,
    sessions: [],
  });
  useEffect(() => {
    setLoading(true);
    (async () => {
      const r = (await (await fetch('/api/getEvent', {
        body: JSON.stringify({event}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
      setEventDetails(r);
    })();
    if (eventDetails.title) setLoading(false);
  }, [event]);
  useEffect(() => {
    if (eventDetails.title) setLoading(false);
  }, [eventDetails]);
  return (
    <>
      {loading ? <Spinner /> : (
      <>
        <Hero
          title={eventDetails.title}
          type={eventDetails.type}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <Description
            description={eventDetails.description}
          />
          {eventDetails.sessions ? (<RsvpSection
            proposerName={eventDetails.proposerName!}
            sessionsCount={eventDetails.sessionCount!}
            sessions={eventDetails.sessions!}
          />) : <></>}
        </div>
      </>
      )}
    </>
  );
};

export default EventPage;