import React from "react";
import styles from "./SingleApplication.module.css";
import dayjs from "dayjs";

const SingleApplication = ({ application }) => {
  const formattedDate = (date) => {
    const result = dayjs(date);
    return result.format("MM-DD-YYYY");
  };

  return (
    <div key={application.guid} className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        <span className={styles.email}>{application.email}</span>
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>£
        {new Intl.NumberFormat().format(application.loan_amount)}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {formattedDate(application.date_created)}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {formattedDate(application.expiry_date)}
      </div>
    </div>
  );
};

export default SingleApplication;
