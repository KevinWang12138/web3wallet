const { ethers } = require("ethers");

function genMnemonic() {
    const randomWallet = ethers.Wallet.createRandom();
    const mnemonic = randomWallet.mnemonic.phrase;
    console.log(mnemonic);
    return mnemonic;
}

// 如果直接运行此文件，则执行 genMnemonic 函数
if (require.main === module) {
    genMnemonic();
}

module.exports = { genMnemonic };