import React, { useState } from "react";
import SingleApplication from "./SingleApplication";
import { getSingleApplicationFixture } from "./__fixtures__/applications.fixture";
import styles from "./Applications.module.css";
import useGetApi from "./hooks/use-get-api";
import { Button } from "./ui/Button/Button";

const Applications = () => {
  const [page, setPage] = useState<number>(1)
  const { data, loading, error, loadMore, loadingMore  } = useGetApi(`http://localhost:3001/api/applications`, 5);
  
  if (loading) {
    return <div className={styles.loader}>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.Applications}>
      {data.map((application) => (
        <SingleApplication key={application.id} application={application} />
      ))}
      <Button onClick={() => loadMore(page, setPage)} >
        {loadingMore ? 'Loading...' : 'Load more'}</Button>
    </div>
  );
};

export default Applications;
