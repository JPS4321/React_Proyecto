// useTraceabilityReport.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTraceabilityReport = () => {
  const [auditData, setAuditData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuditData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/audit/inventory');
        setAuditData(response.data);
      } catch (err) {
        console.error("Error fetching audit data:", err);
        setError('Error fetching audit data');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditData();
  }, []);

  return { auditData, loading, error };
};

export default useTraceabilityReport;
