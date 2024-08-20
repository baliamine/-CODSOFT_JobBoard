import React, { useState, useEffect } from "react";

function EmployerProfile() {
  const [employer, setEmployer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/employer/all-employers/`);

        if (response.status === 404) {
          throw new Error("No such employer found");
        }
        if (response.status === 400) {
          throw new Error("Server error");
        }

        const data = await response.json();

        setEmployer(data[0]);
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerData();
  }, []);

  useEffect(() => {
    console.log("employer", employer);
  }, [employer]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={employer.img} alt="Employer" />
        <h1>{employer.name}</h1>
      </div>
      <div className="profile-details">
        <p>
          <strong>Company:</strong> {employer.companyName}
        </p>
        <p>
          <strong>Email:</strong> {employer.email}
        </p>
      </div>
    </div>
  );
}

export default EmployerProfile;
