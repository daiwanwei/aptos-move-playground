import {AptosAccount, AptosClient, BCS, FaucetClient, HexString, TxnBuilderTypes} from "aptos";
import {UserTransaction} from "aptos/src/generated/models/UserTransaction";
import {getWeiCoinBalance, hasRegisteredCoin, registerWeiCoin, transferWeiCoin} from "./weiCoin";



async function main() {
    const privateKey = "f1c949c8f08eb760cc313f80ef7969ce81758fc66060057180db0b44d700ee24"
    const account = new AptosAccount(Uint8Array.from(Buffer.from(privateKey, 'hex')))
    const url = "https://fullnode.devnet.aptoslabs.com/"
    const faucetUrl = "https://faucet.devnet.aptoslabs.com/"
    const aptosClient = new AptosClient(url)
    const faucetClient = new FaucetClient(url, faucetUrl);
    const receiverPrivateKey = "5e62c13d1682cbeee33165b6c32b996ff1f80c2bbdd96c24cef54b702bc525ef"
    const receiver = new AptosAccount(Uint8Array.from(Buffer.from(receiverPrivateKey, 'hex')))
    const hasRegistered=await hasRegisteredCoin(aptosClient,receiver.address().hex())
    if (!hasRegistered){
        const hash=await registerWeiCoin(
            aptosClient,receiver
        )
        const res = await aptosClient.waitForTransactionWithResult(hash) as UserTransaction
        if (!res.success) {
            console.log(`txn fail,err:${res.vm_status}`)
            return
        }
    }
    const amount=1_000

    let receiverBalance=await getWeiCoinBalance(aptosClient,receiver.address().hex())
    let senderBalance=await getWeiCoinBalance(aptosClient,account.address().hex())
    console.log(`sender(${account.address().hex()}):balance(${senderBalance})\n
    receiver(${receiver.address().hex()}):balance(${receiverBalance})\n`)

    const transferHash=await transferWeiCoin(
        aptosClient,account,receiver.address().hex(),amount
    )
    const transferRes = await aptosClient.waitForTransactionWithResult(transferHash) as UserTransaction
    if (!transferRes.success) {
        console.log(`txn fail,err:${transferRes.vm_status}`)
        return
    }

    console.log(`register wei coin successfully,txn(${transferHash})`)

    receiverBalance=await getWeiCoinBalance(aptosClient,receiver.address().hex())
    senderBalance=await getWeiCoinBalance(aptosClient,account.address().hex())
    console.log(`sender(${account.address().hex()}):balance(${senderBalance})\n
    receiver(${receiver.address().hex()}):balance(${receiverBalance})\n`)
}

main()
    .then(() => console.log(`execute successfully`))
    .catch((err) => console.log(`execute fail,err(${err})`))