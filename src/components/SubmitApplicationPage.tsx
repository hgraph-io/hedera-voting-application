import React, { useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Typography,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/router';
import styles from './SubmitApplicationPage.module.scss';
import { supabase } from '../supabaseClient';

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

    // @ts-ignore
    const selectedTopics = Object.keys(topics).filter((topic) => topics[topic]);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
    const applicationData = {
      name,
      organization,
      topics: selectedTopics,
      links: links.split(',').map((link: string) => link.trim()),
      moderator: interestedInModerator,
      user_id: user?.id,
    };

    try {
      const { error } = await supabase.from('applications').insert(applicationData);

      if (error) {
        console.error('Error submitting application:', error);
        alert('An error occurred. Please try again.');
        return;
      }

      alert('Application submitted successfully.');
      router.push('/');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const goBack = () => {
    router.back();
  };

  return (
    <Container className={styles.submitApplication}>
      <Button variant="outlined" onClick={goBack} style={{ margin: '20px 0px 30px' }}>
        Go Back
      </Button>

      <Typography variant="h4" gutterBottom>
        Submit Application
      </Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Speaker Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Organization"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Links"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              fullWidth
              required
              helperText="Enter comma-separated links."
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Relevant Topics</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox checked={topics.HCS} onChange={handleTopicChange} name="HCS" />
                }
                label="HCS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={topics['Smart Contracts']}
                    onChange={handleTopicChange}
                    name="Smart Contracts"
                  />
                }
                label="Smart Contracts"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={topics.dApps} onChange={handleTopicChange} name="dApps" />
                }
                label="dApps"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={topics.Consensus}
                    onChange={handleTopicChange}
                    name="Consensus"
                  />
                }
                label="Consensus"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend">Participation</FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={interestedInModerator}
                  onChange={(e) => setInterestedInModerator(e.target.checked)}
                />
              }
              label="I'm Interested in being a moderator"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SubmitApplicationPage;
