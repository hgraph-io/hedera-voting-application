'use client';

import { HashConnect, HashConnectTypes } from 'hashconnect';

let appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Voting Application',
  description: 'Voting Application Created By Hedera',
  icon: 'https://launch.turtlemoon.io/_next/static/media/default-profile-picture.75ccdb8e.png',
};

const hashconnect = new HashConnect();
export default hashconnect;

////
console.log(hashconnect);

export async function init() {
  // let initData = await hashconnect.init(appMetadata, 'testnet', false);
  // console.log(initData);
  // let topic = initData.savedPairings[0] ? initData.savedPairings[0].topic : initData.topic;
  // let pairingString = initData.pairingString;
}

async function disconnect(topicId: string) {
  await hashconnect.disconnect(topicId);
}

// events
hashconnect.pairingEvent.on(async (pairingData) => {
  console.log('pairingEvent');
  console.log(pairingData);
  // if (pairingData.accountIds) {
  //   setAccountId(pairingData.accountIds[0]);
  //   setConnected(true);
  // }
});

hashconnect.foundExtensionEvent.once((appMetadata) => {
  console.log('foundExtensionEvent');
  console.log(appMetadata);
  // hashconnect.connectToLocalWallet(pairingString, appMetadata);
});

hashconnect.findLocalWallets();
