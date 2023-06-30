import React from 'react';
import styles from './Results.module.scss';
import Card from './Card';

const Results: React.FC = () => {
  const cards = [
    // Example data for cards
    {
      type: 'denied',
      speaker: 'John Doe',
      title: 'Card 4',
      isSelected: false,
      rating: { voteNum: 50, currentRating: 2 },
    },
    // More cards...
  ];

  return (
    <div className={styles.results}>
      {cards.map((card, index) => (
        // @ts-ignore
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

export default Results;
