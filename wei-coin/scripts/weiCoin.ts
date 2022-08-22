import {AptosAccount, AptosClient, BCS, HexString, TxnBuilderTypes} from "aptos";


const WEI_COIN_ADDRESS="6a7455161255abb850c2845fa09bfd100b506328b5853b474a0b432aaaabf745"

export async function initializeWeiCoin(aptosClient: AptosClient, account: AptosAccount): Promise<string> {
    const coinAddress = new HexString(WEI_COIN_ADDRESS)
    const weiCoinType = new TxnBuilderTypes.TypeTagStruct(
        TxnBuilderTypes.StructTag.fromString(`${coinAddress.hex()}::wei_coin::WeiCoin`)
    )
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
            "0x1::managed_coin",
            "initialize",
            [weiCoinType],
            [
                BCS.bcsSerializeStr("Wei Coin"),
                BCS.bcsSerializeStr("WC"),
                BCS.bcsSerializeU8(6),
                BCS.bcsSerializeBool(false),
            ]
        )
    )
    const [{sequence_number: sequenceNumber}, chainId] = await Promise.all([
        aptosClient.getAccount(account.address()),
        aptosClient.getChainId()
    ])
    const expireAt = BigInt(Math.floor(Date.now() / 1000) + 10)
    const tx = new TxnBuilderTypes.RawTransaction(
        TxnBuilderTypes.AccountAddress.fromHex(account.address()),
        BigInt(sequenceNumber),
        payload,
        1000n,
        1n,
        expireAt,
        new TxnBuilderTypes.ChainId(chainId),
    )

    const bcsTx = AptosClient.generateBCSTransaction(account, tx);
    const pendingTx = await aptosClient.submitSignedBCSTransaction(bcsTx);
    console.log(`submit tx(${pendingTx.hash})`)
    return pendingTx.hash
}

export async function mintWeiCoin(
    aptosClient: AptosClient,
    account: AptosAccount,
    receiverAddress: string,
    amount:number,
): Promise<string> {
    const coinAddress = new HexString(WEI_COIN_ADDRESS)
    const weiCoinType = new TxnBuilderTypes.TypeTagStruct(
        TxnBuilderTypes.StructTag.fromString(`${coinAddress.hex()}::wei_coin::WeiCoin`)
    )
    const receiver=new HexString(receiverAddress)
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
            "0x1::managed_coin",
            "mint",
            [weiCoinType],
            [
                BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(receiver.hex())),
                BCS.bcsSerializeUint64(amount)
            ]
        )
    )
    const [{sequence_number: sequenceNumber}, chainId] = await Promise.all([
        aptosClient.getAccount(account.address()),
        aptosClient.getChainId()
    ])
    const expireAt = BigInt(Math.floor(Date.now() / 1000) + 10)
    const tx = new TxnBuilderTypes.RawTransaction(
        TxnBuilderTypes.AccountAddress.fromHex(account.address()),
        BigInt(sequenceNumber),
        payload,
        1000n,
        1n,
        expireAt,
        new TxnBuilderTypes.ChainId(chainId),
    )

    const bcsTx = AptosClient.generateBCSTransaction(account, tx);
    const pendingTx = await aptosClient.submitSignedBCSTransaction(bcsTx);
    console.log(`submit tx(${pendingTx.hash})`)
    return pendingTx.hash
}

export async function registerWeiCoin(aptosClient: AptosClient, account: AptosAccount): Promise<string> {
    const coinAddress = new HexString(WEI_COIN_ADDRESS)
    const weiCoinType = new TxnBuilderTypes.TypeTagStruct(
        TxnBuilderTypes.StructTag.fromString(`${coinAddress.hex()}::wei_coin::WeiCoin`)
    )
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
            "0x1::coins",
            "register",
            [weiCoinType],
            []
        )
    )
    const [{sequence_number: sequenceNumber}, chainId] = await Promise.all([
        aptosClient.getAccount(account.address()),
        aptosClient.getChainId()
    ])
    const expireAt = BigInt(Math.floor(Date.now() / 1000) + 10)
    const tx = new TxnBuilderTypes.RawTransaction(
        TxnBuilderTypes.AccountAddress.fromHex(account.address()),
        BigInt(sequenceNumber),
        payload,
        1000n,
        1n,
        expireAt,
        new TxnBuilderTypes.ChainId(chainId),
    )

    const bcsTx = AptosClient.generateBCSTransaction(account, tx);
    const pendingTx = await aptosClient.submitSignedBCSTransaction(bcsTx);
    console.log(`submit tx(${pendingTx.hash})`)
    return pendingTx.hash
}

export async function transferWeiCoin(
    aptosClient: AptosClient,
    formAccount: AptosAccount,
    toAddress: string,
    amount:number
): Promise<string> {
    const coinAddress = new HexString(WEI_COIN_ADDRESS)
    const weiCoinType = new TxnBuilderTypes.TypeTagStruct(
        TxnBuilderTypes.StructTag.fromString(`${coinAddress.hex()}::wei_coin::WeiCoin`)
    )

    const to = new HexString(toAddress)
    const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
        TxnBuilderTypes.EntryFunction.natural(
            "0x1::coin",
            "transfer",
            [weiCoinType],
            [
                BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(to.hex())),
                BCS.bcsSerializeUint64(amount)
            ]
        )
    )
    const [{sequence_number: sequenceNumber}, chainId] = await Promise.all([
        aptosClient.getAccount(formAccount.address()),
        aptosClient.getChainId()
    ])
    const expireAt = BigInt(Math.floor(Date.now() / 1000) + 10)
    const tx = new TxnBuilderTypes.RawTransaction(
        TxnBuilderTypes.AccountAddress.fromHex(formAccount.address()),
        BigInt(sequenceNumber),
        payload,
        1000n,
        1n,
        expireAt,
        new TxnBuilderTypes.ChainId(chainId),
    )

    const bcsTx = AptosClient.generateBCSTransaction(formAccount, tx);
    const pendingTx = await aptosClient.submitSignedBCSTransaction(bcsTx);
    console.log(`submit tx(${pendingTx.hash})`)
    return pendingTx.hash
}

export async function getWeiCoinBalance(
    aptosClient:AptosClient,userAddress:string
):Promise<string>{
    const user=new HexString(userAddress);
    const coin=new HexString(WEI_COIN_ADDRESS);

    const resource=await aptosClient.getAccountResource(
        user,`0x1::coin::CoinStore<${coin.hex()}::wei_coin::WeiCoin>`
    );
    return (resource.data as any)["coin"]["value"]
}

export async function hasRegisteredCoin(
    aptosClient:AptosClient,userAddress:string
):Promise<boolean>{
    const user=new HexString(userAddress);
    const coin=new HexString(WEI_COIN_ADDRESS);
    const resources=await aptosClient.getAccountResources(
        user,
    );
    for (let resource of resources){
        if (resource.type===`0x1::coin::CoinStore<${coin.hex()}::wei_coin::WeiCoin>`) return true
    }

    return false
}