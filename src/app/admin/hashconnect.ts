'use client';

import { HashConnect, HashConnectTypes } from 'hashconnect';

let appMetadata: HashConnectTypes.AppMetadata = {
  name: 'Hedera Voting Application',
  description: 'Voting Application Created By Hedera',
  icon: 'https://uploads-ssl.webflow.com/634077443e3c357eec6a40fe/64444f46f7fdec1bfe8a1511_logo-twitter4-p-500.png',
};

export default class Client {
  hashconnect: HashConnect;
  signer: any;
  provider: any;
  constructor() {
    this.hashconnect = new HashConnect(); // pass true to enable debug mode

    // events
    this.hashconnect.pairingEvent.on(async (pairingData) => {
      console.log('pairingEvent');
      console.log(pairingData);
      // if (pairingData.accountIds) {
      //   setAccountId(pairingData.accountIds[0]);
      //   setConnected(true);
      // }
    });

    //// hashconnect.foundExtensionEvent.once((appMetadata) => {
    // this.hashconnect.foundExtensionEvent.on((appMetadata) => {
    //   console.log('foundExtensionEvent');
    //   console.log(appMetadata);
    //   // hashconnect.connectToLocalWallet()
    //   // hashconnect.connectToLocalWallet(pairingString, appMetadata);
    // });

    // hashconnect.acknowledgeMessageEvent.once((acknowledgeData) => {
    this.hashconnect.acknowledgeMessageEvent.on((acknowledgeData) => {
      console.log('acknowledgeMessageEvent');
      console.log(acknowledgeData);

      //do something with acknowledge response data
    });

    // hashconnect.connectionStatusChangeEvent.once((connectionStatus) => {
    this.hashconnect.connectionStatusChangeEvent.on((connectionStatus) => {
      console.log('connectionStatusChangeEvent');
      console.log(connectionStatus);
      //do something with connection status
    });

    // @ts-ignore
    // window.hashconnect = this.hashconnect;

    // hashconnect.findLocalWallets();
  }
  async init() {
    const initData = await this.hashconnect.init(appMetadata, 'testnet', false);
    console.log('initData');
    console.log(initData);
    console.log(initData.savedPairings);
    this.provider = this.hashconnect.getProvider(
      'testnet',
      initData.topic,
      //@ts-ignore
      initData.savedPairings[0].accountIds[0]
    );
    this.signer = this.hashconnect.getSigner(this.provider);
    //@ts-ignore
    window.hp = this;
  }
}

// export async function disconnect(topicId: string) {
//   await hashconnect.disconnect(topicId);
//   console.log(hashconnect.hcData);
// }
