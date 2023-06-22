import React from 'react';
import SubmitApplicationPage from '../../components/SubmitApplicationPage'

export default function Proposal() {
  const applicationData = [
  {
    name: 'Patches',
    orginization: 'Hgraph',
    topics: ['NFTs', 'Sustainability'],
    links: ['https://www.hgraph.io'],
    moderator: false
  },
]
  return <SubmitApplicationPage applicationData={applicationData}/>
}