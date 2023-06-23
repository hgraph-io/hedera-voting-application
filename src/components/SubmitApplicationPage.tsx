import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './SubmitApplicationPage.module.scss';

const SubmitApplicationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [topics, setTopics] = useState({
    HCS: false,
    'Smart Contracts': false,
    dApps: false,
    Consensus: false,
  });
  const [links, setLinks] = useState('');
  const [interestedInModerator, setInterestedInModerator] = useState(false);
  const router = useRouter();

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopics({ ...topics, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !organization || !links) {
      alert('All fields are required.');
      return;
    }

    const selectedTopics = Object.keys(topics).filter((topic) => topics[topic]);

    const applicationData = {
      name,
      organization,
      topics: selectedTopics,
      links: links.split(',').map((link: string) => link.trim()),
      moderator: interestedInModerator,
    };

    try {
      await axios.post('api/application/submission', applicationData);
      alert('Application submitted successfully.');
      router.push('/');
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

      <Typography variant="h4">Submit Application</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField label="Speaker Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required />
        <TextField label="Organization" value={organization} onChange={(e) => setOrganization(e.target.value)} fullWidth  />
        <TextField label="Links" value={links} onChange={(e) => setLinks(e.target.value)} fullWidth required helperText="Enter comma-separated links." />
        <br/>
        <br/>
        <FormLabel component="legend">Relevant Topics/Tags</FormLabel>
        <FormGroup>
          <FormControlLabel control={<Checkbox checked={topics.HCS} onChange={handleTopicChange} name="HCS" />} label="HCS" />
          <FormControlLabel control={<Checkbox checked={topics['Smart Contracts']} onChange={handleTopicChange} name="Smart Contracts" />} label="Smart Contracts" />
          <FormControlLabel control={<Checkbox checked={topics.dApps} onChange={handleTopicChange} name="dApps" />} label="dApps" />
          <FormControlLabel control={<Checkbox checked={topics.Consensus} onChange={handleTopicChange} name="Consensus" />} label="Consensus" />
        </FormGroup> 
        <br/>
        <br/>
        <FormLabel component="legend">Participation</FormLabel>
        <FormControlLabel control={<Checkbox checked={interestedInModerator} onChange={(e) => setInterestedInModerator(e.target.checked)} />} label="I'm Interested in being a moderator" />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Box>
      </form>
    </Container>
  );
};

export default SubmitApplicationPage;
