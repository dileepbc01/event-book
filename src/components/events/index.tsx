import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';



const Events = () => {
  const eventList = [
    { id: 1, title: 'Music Concert', date: '2025-04-20', location: 'City Hall' },
    { id: 2, title: 'Art Exhibition', date: '2025-04-22', location: 'Art Gallery' },
    { id: 3, title: 'Tech Conference', date: '2025-04-25', location: 'Convention Center' },
  ];

  return (
    <AppLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventList.map((event) => (
          <Card key={event.id} className="shadow-md">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </CardContent>
            <CardFooter>
              <Button variant="default">Book Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
};

export default Events;