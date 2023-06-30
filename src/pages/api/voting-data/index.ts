// @ts-nocheck
import axios from 'axios'

const getVotingData = async (clientAccountId?:string) => {
    const topicId =  process.env.VOTING_TOPIC_ID;
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
    } else {
        return {messageObjArray, initialMessageObjArray}
    }
    
}

export default async function handler(req, res) {
    // Extract the clientAccountId from the request query
    const clientAccountId = req.query.id;
    console.log(req.body)
    // Get all auction NFTs that are in stock, filtered by clientAccountId if it exists
    const votingNfts = await getVotingData(clientAccountId)
    console.log(votingNfts)
    let parsedMessageObjs = votingNfts.initialMessageObjArray

    let deletedBallots = []
    let initBallots = []
    let votes = []
    for (let index = 0; index < parsedMessageObjs.length; index++) {
        const messageObj = parsedMessageObjs[index];
        console.log(messageObj)
        switch(messageObj.type) {
            case "ballot":
                    initBallots.push(messageObj);
                break;
            case "delete-ballot":
                    deletedBallots.push(messageObj);
                break;
            case "vote":
                    votes.push(messageObj);
                break;
        }    
    }
    
    let ballots = initBallots.map((ballot) => {
        let ballotDeleted = deletedBallots.filter((obj) => obj.id == ballot.id).length > 0
        
        ballot.deleted = ballotDeleted

        // Get all ballot votes
        console.log('raw votes',votes)
        let ballotVotes = votes.filter((vote) => vote.ballotId == ballot.id)

        // Add votes to ballot for easy reading by ballot
        ballot.votes = ballotVotes.reverse()
        ballot.results = {key:{}, series: [], labels:[]}

        // Add results to ballot for easy reading
        for (let index = 0; index < ballot.votes.length; index++) {
            const vote = ballot.votes[index];
            ballot.results.key[vote.choice] = ballot.results.key[vote.choice] ? ballot.results.key[vote.choice] + 1 : 1
        }

        let castedVoteChoices = Object.keys(ballot.results.key)
        for (let index = 0; index < castedVoteChoices.length; index++) {
            const choiceAmount = ballot.results.key[castedVoteChoices[index]];
            ballot.results.series.push(choiceAmount)
            ballot.results.labels.push(castedVoteChoices[index])
        }
        const currentTimeStamp = new Date().getTime()* 1000000

        // Get state of ballot
        let state = ""
        if (parseInt(ballot.endTimestamp) > currentTimeStamp) {
            if (parseInt(ballot.startTimestamp) < currentTimeStamp) {
                state = "open"
                ballot.active = true
            } else {
                state = "upcoming"
                ballot.active = false
            }
        } else {
            state = "closed"
            ballot.active = false
        }

        ballot.state = state
        return ballot
    })
 
    console.log("votes",votes)
    res.status(200).json({success:{ballots:ballots, votes: votes}})
    return
}


