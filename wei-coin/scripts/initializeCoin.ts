import {AptosAccount, AptosClient, BCS, HexString, TxnBuilderTypes} from "aptos";
import {UserTransaction} from "aptos/src/generated/models/UserTransaction";
import {initializeWeiCoin} from "./weiCoin";

async function main() {
    const privateKey = "f1c949c8f08eb760cc313f80ef7969ce81758fc66060057180db0b44d700ee24"
    const account = new AptosAccount(Uint8Array.from(Buffer.from(privateKey, 'hex')))
    const url = "https://fullnode.devnet.aptoslabs.com/"
    const aptosClient = new AptosClient(url)

    const hash=await initializeWeiCoin(aptosClient,account)
    const res = await aptosClient.waitForTransactionWithResult(hash) as UserTransaction
    if (!res.success) {
        console.log(`txn fail,err:${res.vm_status}`)
        return
    }

    console.log(`initialize wei coin successfully,txn(${hash})`)
}

main()
    .then(() => console.log(`execute successfully`))
    .catch((err) => console.log(`execute fail,err(${err})`))