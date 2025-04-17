import useBookEvent from '@/hooks/useBookEvent';
import { useEvent } from '@/hooks/useEvents';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const BookEvent = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router= useRouter();

  const {bookEvent,loading:isBooking}=useBookEvent()

  const {error,event:eventDetails,loading}=useEvent(router.query.id as string);

  if(error){
    return <div>Error: {error}</div>;
  }

  if(loading || !eventDetails){
    return <div>Loading...</div>;
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    await bookEvent({
      email: email,
      full_name: name,
      end_time:(new Date()).toISOString(),
      start_time: (new Date()).toISOString(),
      event_id: eventDetails.id,
      additional_notes: 'No additional notes',      
    });
    setName('');
    setEmail('');
  };
  console.log(eventDetails)
  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Book Event: {eventDetails.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {
            isBooking ? 'Booking...' : 'Book Now'
          }
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default BookEvent;