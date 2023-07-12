'use client';

import { HashConnect, HashConnectTypes } from 'hashconnect';

let appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Voting Application',
  description: 'Voting Application Created By Hedera',
  icon: 'https://uploads-ssl.webflow.com/634077443e3c357eec6a40fe/64444f46f7fdec1bfe8a1511_logo-twitter4-p-500.png',
};

const hashconnect = new HashConnect(true); // true for debug mode
export default hashconnect;

// events
hashconnect.pairingEvent.on(async (pairingData) => {
  console.log('pairingEvent');
  console.log(pairingData);
  // if (pairingData.accountIds) {
  //   setAccountId(pairingData.accountIds[0]);
  //   setConnected(true);
  // }
});

// hashconnect.foundExtensionEvent.once((appMetadata) => {
hashconnect.foundExtensionEvent.on((appMetadata) => {
  console.log('foundExtensionEvent');
  console.log(appMetadata);
  // hashconnect.connectToLocalWallet()
  // hashconnect.connectToLocalWallet(pairingString, appMetadata);
});

// hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
hashconnect.acknowledgeMessageEvent.on((acknowledgeData) => {
  console.log('acknowledgeMessageEvent');
  console.log(acknowledgeData);

  //do something with acknowledge response data
});

// hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
  console.log('connectionStatusChangeEvent');
  console.log(connectionStatus);
  //do something with connection status
});

// hashconnect.findLocalWallets();

export async function init() {
  let initData = await hashconnect.init(appMetadata, 'testnet', false);
  console.log(initData);
  // let topic = initData.savedPairings[0] ? initData.savedPairings[0].topic : initData.topic;
  // let pairingString = initData.pairingString;
}

export async function disconnect(topicId: string) {
  await hashconnect.disconnect(topicId);
  console.log(hashconnect.hcData);
}
