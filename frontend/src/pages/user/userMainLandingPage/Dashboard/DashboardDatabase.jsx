// DashboardDatabase.jsx
import { useEffect, useState } from 'react';

// Placeholder for database fetch logic
const useDashboardData = () => {
  const [counts, setCounts] = useState({
    successful: 0,
    student: 0,
    invalid: 0,
    manual: 0,
    guest: 0,
  });

  useEffect(() => {
    // Simulate DB fetch
    const fetchData = async () => {
      // Replace this with actual Firestore logic
      const simulatedData = {
        successful: 122,
        student: 97,
        invalid: 6,
        manual: 14,
        guest: 21,
      };
      setCounts(simulatedData);
    };

    fetchData();
  }, []);

  return counts;
};

export default useDashboardData;
