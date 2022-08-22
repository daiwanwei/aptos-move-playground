# wei-coin

## Description

**tutorial of Coin(ERC20) on Aptos**

## Scripts

- [x] initialize Wei Coin
- [x] register Wei Coin
- [x] mint Wei Coin
- [x] transfer Wei Coin

## How To Run This Project

### Compile & publish Move contract
```shell
# compile wei_coin.move
$ aptos move compile --named-addresses WeiCoinType=default
# publish wei_coin.move on chain
$ aptos move publish --named-addresses WeiCoinType=default
```

### Setup variable
```typescript
// after publishing module, modify WEI_COIN_ADDRESS in scripts/weiCoin.ts
WEI_COIN_ADDRESS=`<module-address>`
/*modify private key in 
initializeCoin.ts/registerCoin.ts/mintCoin.ts/transferCoin.ts
*/
privateKey = `<your-private-key>`
```


### Run scripts

```shell
# install package
$ yarn install

# after publish contract
# following the instructions below
# 1. initialize coin (create resource of coin info)
$ yarn scripts:initializeCoin
# 2. register coin (user建立存錢帳戶)
$ yarn scripts:registerCoin
# 3. mint coin (發行coin至user帳戶)
$ yarn scripts:mintCoin
# 4. transfer coin (轉錢功能)
$ yarn scripts:transferCoin
```


