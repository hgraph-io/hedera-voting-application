import React from 'react';
import styles from './AdminResultsPage.module.scss';

const AdminResultsPage: React.FC = () => {
  const cards = [
    // Example data for cards
    { type: 'vote', speaker: 'John Doe', title: 'Card 2', isSelected: false, rating: { voteNum: 30, currentRating: 3 } },
    // More cards...
  ];

  return (
    <div className={styles.adminDashboard}>
      {/* {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))} */}
    </div>
  );
};

export default AdminResultsPage;
