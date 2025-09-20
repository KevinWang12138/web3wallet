import { ethers } from "ethers";

class Wallet {
    wallet: ethers.HDNodeWallet;
    mnemonic: string;
    publicKey: string;
    privateKey: string;
    address: string;
    constructor() {
        this.wallet = Wallet.genNewWallet();
        this.mnemonic = this.wallet.mnemonic?.phrase || '';
        this.publicKey = this.wallet.publicKey
        this.privateKey = this.wallet.privateKey
        this.address = this.wallet.address
    }

    static genNewWallet() :ethers.HDNodeWallet{
        return ethers.Wallet.createRandom();
    }
}

// 如果直接运行此文件，则执行 genNewWallet 方法
if (import.meta.url === `file://${process.argv[1]}`) {
    const wallet = new Wallet();
    console.log(wallet.mnemonic);
    console.log(wallet.publicKey);
    console.log(wallet.privateKey);
    console.log(wallet.address);
}

export { Wallet };