

import React, { useEffect } from 'react'

import Web3  from 'web3'    
import tokenjson from '../build/HflToken.json'

import exchangejson from '../build/Exchange.json'

export default function Content() {

    useEffect(() => {
        async function start(){
            // 1.获取连接后的合约
            const web = await initWeb()
            console.log(web)

            // useContext, useReducer
            // 订阅发布
            // 设置成全局
            window.web = web  // 全局对象

            // 2.获取资产信息
            // 3.获取订单信息
            // const web3 = new Web3(Web3.givenProvider)
            // const accounts = await web3.eth.getAccounts()
            // console.log(accounts)
        }
        start()
    }, [])

    async function initWeb() {
        var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        // 先授权
        let account = await web3.eth.requestAccounts()
        console.log(account[0])

        const firstkey = Object.keys(tokenjson.networks)[0]
        console.log('firstkey', firstkey)
        const tokenaddress = tokenjson.networks[firstkey].address
        console.log('tokenaddress', tokenaddress)
        const tokenapi = tokenjson.abi
        // 连接合约
        const token = await new web3.eth.Contract(tokenapi, tokenaddress)
        console.log(token)

        const exchangeFirstkey = Object.keys(exchangejson.networks)[0]
        console.log('exchangeFirstkey', exchangeFirstkey)
        const exchangeTokenaddress = exchangejson.networks[exchangeFirstkey].address
        console.log('exchangeTokenaddress', exchangeTokenaddress)
        const exchangeTokenapi = exchangejson.abi
        // 连接合约
        const exchangeToken = await new web3.eth.Contract(exchangeTokenapi, exchangeTokenaddress)
        console.log(exchangeToken)

        return {
          web3,
          account: account[0],
          token,
          exchangeToken
        }

    }

  return (
    <div>Content</div>
  )
}
