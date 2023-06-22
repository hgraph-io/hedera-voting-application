// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import {AccountId, PrivateKey, Client, TokenAssociateTransaction, TopicMessageSubmitTransaction, TransactionId, Hbar} from '@hashgraph/sdk'
const mainTopicId = process.env.VOTE_TOPIC_ID;

function hex2a(hexx) {
    let hex = hexx.toString();//force conversion
    hex = hex.split('\\x')[1]
    let str = '';
    for (let i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

const getVotingStatusByAccountId = async (clientAccountId) => {
    const topicId =  mainTopicId;
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
            "topicId": topicId
        }
    };
    const votingQueryResponse = await axios({
        url: votingEndpoint,
        method: 'post',
        headers: votingHeaders,
        data: nftVotingQuery
    });

    let messageObjArray = []
    let initialMessageObjArray = []
    console.log(votingQueryResponse.data)
     if (votingQueryResponse.data && votingQueryResponse.data.data && votingQueryResponse.data.data.topic_message) {

        const topicMessages = votingQueryResponse.data.data.topic_message
        console.log(topicMessages)
        for (let index = 0; index < topicMessages.length; index++) {
            const topicMessage = topicMessages[index];
            const decodedMessage = await hex2a(topicMessage.message)
            let messageObj 
            try{
                messageObj = JSON.parse(decodedMessage)
            }catch(e){
                const decodedSecondMessage = await hex2a(topicMessages[index+1].message)
                messageObj = JSON.parse(decodedMessage + decodedSecondMessage)
                index = index + 1
            }
            messageObj.consensus_timestamp = topicMessage.consensus_timestamp
            messageObj.sequence_number = topicMessage.sequence_number
            initialMessageObjArray.push(messageObj)
        }
        if (clientAccountId) {
            messageObjArray = initialMessageObjArray.filter((obj) => obj.accountId === clientAccountId)
        }
        return {messageObjArray, initialMessageObjArray}
    } 
    return []
}

// ---------------------
// Create ballot
export const vote = async (ballotObject, settings) => {
    console.log('submit vote')
    // JSONB standard for table
    const jsonb = {   
        "type": "vote",
        "id": ballotObject.id,
        "choice": ballotObject.choice,
        "tokenId": ballotObject.tokenId,
        "serialNumber": ballotObject.serialNumber,
        "ballotId": ballotObject.ballotId,
        "accountId": ballotObject.accountId,
    }
    await submitTopicMessage(jsonb, settings)
}

// Function to submit messages to the assigned topid Id
const submitTopicMessage = async (jsonb, settings) => {
    // Stringify jsonb
    let jsonb_string = JSON.stringify(jsonb)

    // Encrpyt if true
    if (settings.encrypted) {
        jsonb_string = CryptoJS.AES.encrypt(jsonb_string, settings.secretPassphrase).toString();
    }

    // Submit topic id message
    let sendResponse = await new TopicMessageSubmitTransaction()
        .setTopicId(settings.topicId)
        .setMessage(jsonb_string)
        .freezeWith(settings.client)

    const signTx = await sendResponse.sign(settings.submitKey)
    const txResponse = await signTx.execute(settings.client)
    const getReceipt = await txResponse.getReceipt(settings.client);

    // Get the status of the transaction
    const transactionStatus = getReceipt.status
    console.log("The message transaction status" + transactionStatus)
}



const votingSubmission = async (ballotObject) => {
    console.log("ballotObject", ballotObject)
    const queryDelay = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({})
        }, 6500)
    })
    
    await queryDelay
    const {messageObjArray, initialMessageObjArray} = await getVotingStatusByAccountId(ballotObject.accountId)
    console.log(initialMessageObjArray)
    const allHolderVotes = initialMessageObjArray.filter((obj) => obj.type == "vote")
    const nftVotingData = allHolderVotes.filter((obj) => (obj.nftId === ballotObject.serialNumber + '@' +ballotObject.tokenId))
    const ballotVotesOfUser = nftVotingData.filter((vote) => vote.ballotId === ballotObject.ballotId)

    if (ballotVotesOfUser.length >= 1) {
        console.log("duplicate-votes")
        return "duplicate-votes"
    }

    const operatorId = AccountId.fromString(process.env.GLOBAL_TMLP_TOPIC_ACCOUNT_ID)
    const operatorKey = PrivateKey.fromString(process.env.GLOBAL_TMLP_TOPIC_ACCOUNT_PK)
    const client = await Client.forMainnet().setOperator(operatorId, operatorKey)

    const jsonb = {   
        "type": "vote",
        "nftId": ballotObject.serialNumber,
        "choice": ballotObject.choice,
        "tokenId": ballotObject.tokenId,
        "serialNumber": ballotObject.serialNumber,
        "ballotId": ballotObject.ballotId,
        "accountId": ballotObject.accountId,
    }
    console.log("jsonb:",jsonb)

    const settings = {
        topicId: "0.0."+mainTopicId,
        client: client,
        submitKey: await PrivateKey.fromString(process.env.VOTING_SUBMIT_KEY)
    }
   await submitTopicMessage(jsonb, settings)

   return "success"
}

export default async function handler(req, res) {
    const accountId = req.body.accountId
    const serialNumber = req.body.serialNumber
    const tokenId = req.body.tokenId
    const ballotId = req.body.ballotId
    const choice = req.body.choice
    // console.log(accountId.split('.0.')[1])
    // console.log(req.body.serialNumber)
    // console.log(tokenId.split('.0.')[1])
    // const votingEndpoint = process.env.HGRAPH_ENDPOINT_BETA;
    // const votingHeaders = {
    //     "content-type": "application/json",
    //     "x-api-key": process.env.HGRAPH_KEY
    // };
    // const nftVotingQuery = {
    //     "operationName": "GetVotingNfts",
    //     "query": `query GetVotingNfts($accountId: bigint, $serialNumber: bigint, $tokenId: bigint ) {
    //         nft(where: {account_id: {_eq: $accountId}, serial_number: {_eq: $serialNumber}, token_id: {_eq: $tokenId}}) {
    //             account_id
    //             serial_number
    //             metadata
    //             token_id
    //         }
    //     }`,
    //     "variables": { 
    //         "accountId": accountId.split('.0.')[1],
    //         "serialNumber": serialNumber,
    //         "tokenId": tokenId.split('.0.')[1],
    //     }
    // };
    // const userTokensQueryResponse = await axios({
    //     url: votingEndpoint,
    //     method: 'post',
    //     headers: votingHeaders,
    //     data: nftVotingQuery
    // });
    // const data = userTokensQueryResponse.data
    // console.log(data)
    // const nftsHeld = data.data.nft
    const nft = true

    // Get all voting data by serial number
    console.log('Submit Vote')
    if (nft) {
        const voting = await votingSubmission({tokenId, serialNumber, accountId, ballotId, choice})

        if (voting === "duplicate-votes") {
            res.status(400).json({error:{title:"Error!", description: "This NFT has already voted. NFTs cannot vote twice on the same ballot with the same NFT"}})
            return
        } else {
            res.status(200).json({success:{title:"Vote Submitted!", description: `You've successfully voted, your vote is now on the mainnet and counted!`}})
            return
        }
    } else {
        res.status(400).json({success:{title:"Error!", description: `This NFT doesn't seem to be owned by the connected account Id`}})
        return
    }
}


