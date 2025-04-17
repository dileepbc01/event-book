import React, { useState } from 'react';

const BookEvent = ({ eventTitle }: { eventTitle: string }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(`Thank you, ${name}, for booking "${eventTitle}"!`);
    setName('');
    setEmail('');
  };

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Book Event: {eventTitle}</h2>
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
          Book Now
        </button>
      </form>
      {successMessage && (
        <p className="mt-4 text-green-600 font-medium">{successMessage}</p>
      )}
    </div>
  );
};

export default BookEvent;