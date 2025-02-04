// components/ActivityList.tsx
import React, { useState } from 'react';

interface Activity {
  id: number;
  title: string;
  description: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: 'Romantic Dinner',
    description: 'Enjoy a candlelit dinner at your favourite restaurant.'
  },
  {
    id: 2,
    title: 'Evening Stroll',
    description: 'Take a leisurely walk in the park and enjoy the scenic beauty.'
  },
  {
    id: 3,
    title: 'Movie Night',
    description: 'Watch a romantic film together at home.'
  },
];

const ActivityList: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  return (
    <section className="activity-list">
      <h2>What shall we do today?</h2>
      <ul>
        {activities.map(activity => (
          <li key={activity.id}>
            <button onClick={() => setSelectedActivity(activity)}>
              {activity.title}
            </button>
          </li>
        ))}
      </ul>
      {selectedActivity && (
        <div className="activity-details">
          <h3>{selectedActivity.title}</h3>
          <p>{selectedActivity.description}</p>
        </div>
      )}
    </section>
  );
};

export default ActivityList;
