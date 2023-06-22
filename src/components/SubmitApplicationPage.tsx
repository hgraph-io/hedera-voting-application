import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Box } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './SubmitApplicationPage.module.scss';

const SubmitApplicationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [topics, setTopics] = useState('');
  const [links, setLinks] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !organization || !topics || !links) {
      alert('All fields are required.');
      return;
    }

    const applicationData = {
      name,
      organization,
      topics: topics.split(',').map((topic: string) => topic.trim()),
      links: links.split(',').map((link: string) => link.trim()),
      moderator: false,
    };

    try {
      await axios.post('api/application/submission', applicationData); // replace with actual API
      alert('Application submitted successfully.');
      router.push('/'); // redirect to home page or wherever you want
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const goBack = () => {
    router.back();
  }

  return (
    <Container className={styles.submitApplication}>
      <Button variant="outlined" onClick={goBack} style={{ marginTop: "20px", marginLeft: "20px" }}>Go Back</Button>

      <h2>Submit Application</h2>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField label="Speaker Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
        <TextField label="Organization" value={organization} onChange={(e) => setOrganization(e.target.value)} fullWidth required />
        <TextField label="Related Topics" value={topics} onChange={(e) => setTopics(e.target.value)} fullWidth required helperText="Enter comma-separated topics." />
        <TextField label="Links" value={links} onChange={(e) => setLinks(e.target.value)} fullWidth required helperText="Enter comma-separated links." />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Box>
      </form>
    </Container>
  );
};

export default SubmitApplicationPage;
