import Hero from './rsvp/Hero';
import Description from './rsvp/Description';
import RsvpSection from './rsvp/RsvpSection';
import {useState, useEffect} from 'react';
import Spinner from './Spinner';
import {ClientEvent, Session} from '../types';
const EventPage = ({
  event,
}: {
  event?: string | string[] | undefined
}) => {
  // call api here, pass data to children
  const [loading, setLoading] = useState<boolean>(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [eventDetails, setEventDetails] = useState<ClientEvent>({
    title: '',
    description: '',
    proposerName: '',
    sessionCount: 0,
    sessions,
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
    setLoading(false);
  }, [event]);
  useEffect(() => {
    setSessions(eventDetails.sessions!);
  }, [sessions]);
  return (
    <>
      <Hero
        title={eventDetails.title}
        type={eventDetails.type}
      />
      {
      loading?
        <Spinner /> :
        <div className="grid grid-cols-3 gap-9">
          <Description
            description={eventDetails.description}
          />
          {eventDetails.sessions ? (<RsvpSection
            proposerName={eventDetails.proposerName!}
            sessionsCount={eventDetails.sessionCount!}
            sessions={eventDetails.sessions!}
          />) : <></>}
        </div>
      }
    </>
  );
};

export default EventPage;
