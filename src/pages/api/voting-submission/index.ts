// @ts-nocheck
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { AccountId, PrivateKey, Client, TopicMessageSubmitTransaction, TransactionId, Hbar } from '@hashgraph/sdk';
import CryptoJS from 'crypto-js';

const mainTopicId = process.env.VOTING_TOPIC_ID;

const hex2a = (hexx: string): string => {
    let hex = hexx.toString().split('\\x')[1]; //force conversion
    let str = '';
    for (let i = 0; i < hex.length; i += 2) {
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return str;
};

const createPostAxiosInstance = (url: string, data: any, headers: any) =>
    axios({ url, method: 'post', headers, data });

const submitTopicMessage = async (jsonb: any, settings: any) => {
    // Stringify jsonb
    let jsonb_string = JSON.stringify(jsonb)

    // Encrypt if true
    if (settings.encrypted) {
        jsonb_string = CryptoJS.AES.encrypt(jsonb_string, settings.secretPassphrase).toString();
    }

    // Submit topic id message
    let sendResponse = await new TopicMessageSubmitTransaction()
        .setTopicId(settings.topicId)
        .setMessage(jsonb_string)
        .freezeWith(settings.client);

    const signTx = await sendResponse.sign(settings.submitKey);
    const txResponse = await signTx.execute(settings.client);
    const getReceipt = await txResponse.getReceipt(settings.client);

    // Get the status of the transaction
    const transactionStatus = getReceipt.status;
    console.log("The message transaction status" + transactionStatus);
};

const getVotingStatusByAccountId = async (clientAccountId: string) => {
    const votingEndpoint = process.env.HGRAPH_ENDPOINT_BETA;
    const votingHeaders = {
        "content-type": "application/json",
        "x-api-key": process.env.HGRAPH_KEY
    };
    const nftVotingQuery = {
        "operationName": "GetVotingHCS",
        "query": `query GetVotingHCS($topicId: bigint) {
            topic_message(where: {topic_id: {_eq: $topicId}}, order_by: {consensus_timestamp: asc}) {
                message
                sequence_number
                consensus_timestamp
            }
        }`,
        "variables": {
            "topicId": mainTopicId
        }
    };

    const votingQueryResponse = await createPostAxiosInstance(votingEndpoint, nftVotingQuery, votingHeaders);
    const topicMessages = votingQueryResponse.data?.data?.topic_message || [];

    let initialMessageObjArray = [];
    for (let index = 0; index < topicMessages.length; index++) {
        const topicMessage = topicMessages[index];
        let decodedMessage = await hex2a(topicMessage.message);
        let messageObj;
        try {
            messageObj = JSON.parse(decodedMessage);
        } catch (e) {
            decodedMessage = await hex2a(topicMessages[index + 1].message);
            messageObj = JSON.parse(decodedMessage + decodedMessage);
            index++;
        }
        messageObj.consensus_timestamp = topicMessage.consensus_timestamp;
        messageObj.sequence_number = topicMessage.sequence_number;
        initialMessageObjArray.push(messageObj);
    }

    const messageObjArray = clientAccountId ? initialMessageObjArray.filter((obj) => obj.accountId === clientAccountId) : [];
    return { messageObjArray, initialMessageObjArray };
};

const getFilterVotes = (obj: any, accountId: string, ballotId: string, serialNumber: string, tokenId: string) => 
    obj.type === 'vote' && obj.nftId === serialNumber + '@' + tokenId && obj.ballotId === ballotId && obj.accountId === accountId;

const votingSubmission = async (ballotObject: any) => {
    // Delay for HCS consensus to avoid duplicates
    const delay = new Promise((resolve) => setTimeout(resolve, 6500));
    await delay;

    const { initialMessageObjArray } = await getVotingStatusByAccountId(ballotObject.accountId);
    const allHolderVotes = initialMessageObjArray.filter((obj) => obj.type === 'vote');
    const allBallotVotes = allHolderVotes.filter((vote) => vote.ballotId === ballotObject.ballotId);
    const ballotVotesOfUser = allBallotVotes.filter((vote) => vote.accountId === ballotObject.accountId);
    console.log('allHolderVotes', allHolderVotes)
    console.log(ballotVotesOfUser)

    // Sense if this is a duplicate vote 
    if (!ballotObject.accountId) {
        console.log("Account isn't provided");
        return "account-undefined";
    }

    // Sense if this is a duplicate vote 
    if (ballotVotesOfUser.length >= 1) {
        console.log("duplicate-votes");
        return "duplicate-votes";
    }

    const operatorId = AccountId.fromString(process.env.GLOBAL_TMLP_TOPIC_ACCOUNT_ID);
    const operatorKey = PrivateKey.fromString(process.env.GLOBAL_TMLP_TOPIC_ACCOUNT_PK);
    const client = await Client.forMainnet().setOperator(operatorId, operatorKey);

    const jsonb = {
        "type": "vote",
        "choice": ballotObject.choice,
        "ballotId": ballotObject.ballotId,
        "accountId": ballotObject.accountId,
    };

    const settings = {
        topicId: "0.0." + mainTopicId,
        client: client,
        submitKey: await PrivateKey.fromString(process.env.VOTING_SUBMIT_KEY)
    };

    await submitTopicMessage(jsonb, settings);

    return "success";
};

export default async function handler(req: any, res: any) {
    const { accountId, serialNumber, tokenId, ballotId, choice } = req.body;
//     console.log('Submit Vote');
    console.log(req.body)
    const voting = await votingSubmission({ tokenId, serialNumber, accountId, ballotId, choice });

    if (voting === "duplicate-votes") {
        res.status(400).json({ error: { title: "Error!", description: "This NFT has already voted. NFTs cannot vote twice on the same ballot with the same NFT" } });
        return;
    } else if (voting === "account-undefined") {
        res.status(400).json({ error: { title: "Error!", description: "Please login as an admin with Hashpack to vote."} });
        return;
    } else {
        res.status(200).json({ success: { title: "Vote Submitted!", description: `You've successfully voted, your vote is now on the mainnet and counted!` } });
        return;
    }
}
