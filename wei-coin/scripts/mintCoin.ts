import {AptosAccount, AptosClient, BCS, HexString, TxnBuilderTypes} from "aptos";
import {UserTransaction} from "aptos/src/generated/models/UserTransaction";
import {getWeiCoinBalance, mintWeiCoin} from "./weiCoin";


async function main() {
    const privateKey = "f1c949c8f08eb760cc313f80ef7969ce81758fc66060057180db0b44d700ee24"
    const account = new AptosAccount(Uint8Array.from(Buffer.from(privateKey, 'hex')))
    const url = "https://fullnode.devnet.aptoslabs.com/"
    const aptosClient = new AptosClient(url)

    const receiverAddress=account.address().hex();
    const amount=1_000_000_000;

    const hash=await mintWeiCoin(aptosClient,account,receiverAddress,amount)
    const res = await aptosClient.waitForTransactionWithResult(hash) as UserTransaction
    if (!res.success) {
        console.log(`txn fail,err:${res.vm_status}`)
        return
    }

    console.log(`mint wei coin successfully,txn(${hash})`)

    const balance=await getWeiCoinBalance(aptosClient,receiverAddress)
    console.log(`user(${receiverAddress}):balance(${balance})`)
}

main()
    .then(() => console.log(`execute successfully`))
    .catch((err) => console.log(`execute fail,err(${err})`))