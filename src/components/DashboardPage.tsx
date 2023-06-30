//@ts-nocheck
import React, { useState, useEffect } from "react";
import { Typography, Container, Button, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import CardComponent from "../components/Card";
import styles from "./DashboardPage.module.scss";
import { supabase } from "../supabaseClient";
import { useUser } from "../contexts/UserContext";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const user = useUser();

  useEffect(() => {
    const fetchApplications = async () => {
      user?.setLoading(true); // start loading
      const {
        data: { user: sbUser },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("user_id", sbUser?.id);

      if (error) console.error("Error loading applications", error);
      // @ts-ignore
      else setApplications(data);
      user?.setLoading(false); // stop loading
    };

    fetchApplications();
  }, []);

  return (
    <Container maxWidth="md" className={styles.dashboardContainer}>
      <div className={styles.header}>
        <Typography
          component="h1"
          variant="h3"
          align="left"
          color="textPrimary"
          gutterBottom
        >
          Dashboard
        </Typography>
        <Typography align="left" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          viverra sed justo vestibulum commodo. Phasellus id urna mollis,
          sollicitudin neque eu, dictum purus. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Vestibulum viverra sed justo vestibulum
          commodo. Phasellus id urna mollis, sollicitudin neque eu, dictum
          purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Vestibulum viverra sed justo vestibulum commodo. Phasellus id urna
          mollis, sollicitudin neque eu, dictum purus.
        </Typography>
        <Button
          className={styles.buttonContainer}
          variant="contained"
          onClick={() => router.replace("/application/create")}
        >
          Submit New Application
        </Button>
      </div>
      <div className={styles.cardContainer}>
        {applications.length > 0 && (
          <Typography variant="h4">Previous Applications</Typography>
        )}
        <div className={styles.cardContainer}>
          {applications.map((application, index) => (
            <CardComponent
              key={index}
              moderator={application.moderator}
              applicationId={application.id}
              rating={{
                voteNum: application.voteNum,
                currentRating: application.currentRating,
              }}
              speaker={application.name}
              isSelected={application.isSelected}
              type={application.type}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default DashboardPage;
