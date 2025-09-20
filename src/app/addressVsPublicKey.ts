import { ethers } from "ethers";

function demonstrateAddressVsPublicKey() {
    console.log("🔍 演示 Address vs PublicKey 的区别\n");

    // 创建一个随机钱包
    const wallet = ethers.Wallet.createRandom();
    
    console.log("1. 钱包信息:");
    console.log("   助记词:", wallet.mnemonic?.phrase);
    console.log("   私钥:", wallet.privateKey);
    console.log("   公钥:", wallet.publicKey);
    console.log("   地址:", wallet.address);
    
    console.log("\n2. 长度对比:");
    console.log("   私钥长度:", wallet.privateKey.length, "字符");
    console.log("   公钥长度:", wallet.publicKey.length, "字符");
    console.log("   地址长度:", wallet.address.length, "字符");
    
    console.log("\n3. 字节长度:");
    console.log("   私钥字节:", wallet.privateKey.length / 2, "字节");
    console.log("   公钥字节:", wallet.publicKey.length / 2, "字节");
    console.log("   地址字节:", wallet.address.length / 2, "字节");
    
    console.log("\n4. 地址生成过程:");
    // 从公钥计算地址
    const publicKeyBytes = ethers.getBytes(wallet.publicKey);
    const addressFromPublicKey = ethers.computeAddress(publicKeyBytes);
    console.log("   原始地址:", wallet.address);
    console.log("   从公钥计算的地址:", addressFromPublicKey);
    console.log("   地址是否匹配:", wallet.address === addressFromPublicKey);
    
    console.log("\n5. 用途说明:");
    console.log("   私钥: 用于签名交易，必须保密");
    console.log("   公钥: 用于验证签名，可以公开");
    console.log("   地址: 用于接收资金，可以公开");
    
    return wallet;
}

function demonstrateMultipleWallets() {
    console.log("\n📊 多个钱包的对比:\n");
    
    for (let i = 1; i <= 3; i++) {
        const wallet = ethers.Wallet.createRandom();
        console.log(`钱包 ${i}:`);
        console.log(`   地址: ${wallet.address}`);
        console.log(`   公钥: ${wallet.publicKey.substring(0, 20)}...`);
        console.log(`   私钥: ${wallet.privateKey.substring(0, 20)}...`);
        console.log();
    }
}

function demonstrateAddressGeneration() {
    console.log("🔧 地址生成过程演示:\n");
    
    const wallet = ethers.Wallet.createRandom();
    const publicKey = wallet.publicKey;
    
    console.log("1. 原始公钥:", publicKey);
    
    // 移除 0x 前缀
    const publicKeyHex = publicKey.substring(2);
    console.log("2. 移除前缀:", publicKeyHex);
    
    // 计算 Keccak256 哈希
    const hash = ethers.keccak256(publicKey);
    console.log("3. Keccak256 哈希:", hash);
    
    // 取最后20字节作为地址
    const address = "0x" + hash.substring(hash.length - 40);
    console.log("4. 最终地址:", address);
    console.log("5. 钱包地址:", wallet.address);
    console.log("6. 是否匹配:", address === wallet.address);
}

// 运行所有演示
if (import.meta.url === `file://${process.argv[1]}`) {
    demonstrateAddressVsPublicKey();
    demonstrateMultipleWallets();
    demonstrateAddressGeneration();
}

export { demonstrateAddressVsPublicKey, demonstrateMultipleWallets, demonstrateAddressGeneration };
