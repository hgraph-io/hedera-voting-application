import React from 'react';
import ApplicationPage from '../../../components/ApplicationPage'

export default function Proposal() {
  const applicationData = [
    {
      name: 'Patches',
      orginization: 'Hgraph',
      topics: ['NFTs', 'Sustainability'],
      links: ['www.hgraph.io'],
      moderator: false
    },
  ]
  return <ApplicationPage applicationData={applicationData} />
}