import { useState, useEffect } from "react";

import styles from "../../styles/AdminPanelCss/FrachiseQuary.module.css";

import { MdExpandMore } from "react-icons/md";
import { GiNextButton } from "react-icons/gi";
import axios from "axios";

const FrachiesQuary = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // pagination state
  const [franchiseQueries, setFranchiseQueries] = useState([]); // ✅ state to store data
  const queriesPerPage = 10;

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await axios.get("http://localhost:5000/form/franchies");

        setFranchiseQueries(res.data.franchies); // assuming backend returns { franchies: [...] }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * queriesPerPage;
  const indexOfFirst = indexOfLast - queriesPerPage;
  const currentQueries = franchiseQueries.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(franchiseQueries.length / queriesPerPage);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (

    <div className={styles.FrachiesQuaryContainer}>
      <h1 className={styles.franchiesQuaryheading}>Franchise Query</h1>
      <div className={styles.frenchiesDetailSection}>
        {currentQueries.map((query) => (
          <div key={query._id} className={styles.frenchiesQuaryBox}>

            <div
              className={styles.frenchiesQuaryDetails}

              onClick={() => toggleExpand(query._id)}
            >
              <p>{query.firstName} {query.lastName}</p>
              <MdExpandMore

                className={`${styles.iconcsMore} ${expandedId === query._id ? styles.rotateIcon : ""

                  }`}
              />
            </div>

            {expandedId === query._id && (

              <div className={styles.frenchiesQuaryBox}>

                <p><strong>Name:</strong> {query.firstName} {query.lastName}</p>
                <p><strong>City:</strong> {query.city}</p>
                <p><strong>Address:</strong> {query.address}</p>
                <p><strong>Email:</strong> {query.email}</p>
                <p><strong>Mobile:</strong> {query.mobile}</p>
                <p><strong>Occupation:</strong> {query.currentOccupation}</p>
                <p><strong>Investment Plan:</strong> {query.investmentBudget}</p>
                <p><strong>Timeline:</strong> {query.investmentTimeline}</p>
                <p><strong>Property:</strong> {query.propertyType}</p>
                <p><strong>Reason:</strong> {query.interestReason}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}

      <div className={styles.paginationControls}>
        <button
          className={styles.preview}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <GiNextButton className={styles.previweICone} />

        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button

          className={styles.next}

          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <GiNextButton />
        </button>
      </div>



    </div>
  );
};

export default FrachiesQuary;
