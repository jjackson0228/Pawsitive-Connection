import React from 'react';

const ShelterCard = ({ shelter }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{shelter.name}</h2>
      <p><strong>Location:</strong> {shelter.location}</p>
      <p><strong>Capacity:</strong> {shelter.capacity}</p>
      <p><strong>Description:</strong> {shelter.description}</p>

      {shelter.pets && shelter.pets.length > 0 ? (
        <div>
          <h3>Available Pets:</h3>
          <ul>
            {shelter.pets.map((pet) => (
              <li key={pet._id}>{pet.name} - {pet.type}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No pets available at the moment.</p>
      )}
    </div>
  );
};

export default ShelterCard;
