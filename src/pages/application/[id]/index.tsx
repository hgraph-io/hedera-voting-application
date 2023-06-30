// @ts-nocheck
import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from "axios";
import ApplicationPage from "../../../components/ApplicationPage";
import { supabase } from "../../../supabaseClient";
import withAdmin from "../../../helpers/withAdmin"; // import the withAdmin HOC

// Get Metadata string
const getMetadataString = (hexx: any) => {
  let hex = hexx.toString();
  hex = hex.split("\\x")[1];
  let str = "";
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
};

console.log("before call");
// Fetch votes
async function fetchVotes(
  topicId: number,
  lastSequenceNumber = 0,
  limit = 1000
) {
  const response = await fetch(process.env.HGRAPH_ENDPOINT_BETA, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.HGRAPH_KEY,
    },

    body: JSON.stringify({
      operationName: "GetVotingData",
      query: `
        query GetVotingData($topicId: bigint, $lastSequenceNumber: bigint, $limit: Int) {
          topic_message(
            where: { topic_id: { _eq: $topicId }, sequence_number: { _gt: $lastSequenceNumber } }
            order_by: { sequence_number: asc }
            limit: $limit
          ) {
            consensus_timestamp
            sequence_number
            message
          }
        }
      `,
      variables: {
        topicId: 1350036,
        lastSequenceNumber: lastSequenceNumber,
        limit: limit,
      },
    }),
  });

  const res = await response.json();
  console.log("body", res.data.topic_message);

  const initVotes = res.data.topic_message;
  const decodedVotes = initVotes.map((v) => {
    return { ...v, ...JSON.parse(getMetadataString(v.message)), message: null };
  });

  if (decodedVotes.length < limit) {
    return decodedVotes;
  }
  console.log("decodedVotes", decodedVotes);
  const lastVote = decodedVotes[decodedVotes.length - 1];
  const moreVotes = await fetchVotes(topicId, lastVote.sequence_number, limit);

  return [...decodedVotes, ...moreVotes];
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Make an API call to get all possible IDs (or other dynamic route value).
  // You would replace '/api/voting-data' with the relevant endpoint for your application.

  let { data: applications, error } = await supabase
    .from("applications")
    .select("*");
  console.log("applications", applications);

  const paths = applications.map((application) => ({
    params: { id: application.id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;
  const topicId = Number(process.env.VOTING_TOPIC_ID);

  let { data: applications, error } = await supabase
    .from("applications")
    .select("*");

  let application = applications.filter((a) => a.id === Number(id));

  const votes = await fetchVotes(topicId, 0, 1000);

  let applicationVotes = votes.filter(
    (v) => Number(v.ballotId.split("-")[1]) === Number(id)
  );
  console.log("votes", votes);
  console.log("applicationVotes", applicationVotes);
  return {
    props: {
      applicationData: application,
      votes: applicationVotes,
    },
    revalidate: 10, // In seconds
  };
};

const Proposal: React.FC<{ applicationData: any[]; votes: any[] }> = ({
  applicationData,
  votes,
}) => {
  return <ApplicationPage applicationData={applicationData} votes={votes} />;
};

export default Proposal;
