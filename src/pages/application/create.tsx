// @ts-nocheck
// pages/applications/create.tsx
import React from 'react';
import SubmitApplicationPage from '../../components/SubmitApplicationPage'
import withAuth from '../../helpers/withAuth'; // import the withAuth HOC

const applicationData = [
  {
    name: 'Patches',
    orginization: 'Hgraph',
    topics: ['NFTs', 'Sustainability'],
    links: ['https://www.hgraph.io'],
    moderator: false
  },
];

const Proposal = () => {
  return <SubmitApplicationPage applicationData={applicationData}/>
}

export default withAuth(Proposal); // wrap the component with the withAuth HOC
