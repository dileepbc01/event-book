import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useEvents } from '@/hooks/useEvents';
import Link from 'next/link';



const Events = () => {

  const {events,error,loading}=useEvents();

  if(error){
    return <div>Error: {error}</div>;
  }
  if(loading || !events){
    return <div>Loading...</div>;
  }


  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events&&events.map((event) => (
          <Card key={event.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {event.start_time}</p>
              <p>Location: {event.end_time}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/events/${event.id}/book`} passHref>
              <Button variant="default">Book Now</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Events;