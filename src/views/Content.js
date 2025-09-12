

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Web3  from 'web3'    
import tokenjson from '../build/HflToken.json'

import exchangejson from '../build/Exchange.json'
import Order from './Order'
import Balance from './Balance'
import { loadBalanceData } from '../redux/slices/balanceSlice'
import { loadCancelOrderData , loadAllOrderData, loadFillOrderData } from '../redux/slices/orderSlice'


export default function Content() {
    const dispatch = useDispatch()
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
            dispatch(loadBalanceData(web))

            // 3.获取订单信息
            dispatch(loadCancelOrderData(web))
            dispatch(loadAllOrderData(web))
            dispatch(loadFillOrderData(web))

      
        };
        start()
    }, [dispatch])

    async function initWeb() {
        var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


        // 先授权
        let accounts = await web3.eth.requestAccounts()
        console.log("account[0]",accounts[0])

        const networkId = await web3.eth.net.getId();
        console.log("networkId", networkId)

        const tokenapi = tokenjson.abi
        // const firstkey = Object.keys(tokenjson.networks)[0]
        // console.log('firstkey', firstkey)
        const tokenaddress = tokenjson.networks[networkId].address
        console.log('tokenaddress', tokenaddress)
        // 连接合约
        const token = await new web3.eth.Contract(tokenapi, tokenaddress)
        console.log(token)

        // const exchangeFirstkey = Object.keys(exchangejson.networks)[0]
        // console.log('exchangeFirstkey', exchangeFirstkey)
        const exchangeTokenaddress = exchangejson.networks[networkId].address
        console.log('exchangeTokenaddress', exchangeTokenaddress)
        const exchangeTokenapi = exchangejson.abi
        // 连接合约
        const exchange = await new web3.eth.Contract(exchangeTokenapi, exchangeTokenaddress)
        console.log(exchange)

        return {
          web3,
          account: accounts[0],
          token,
          exchange
        }

    }

  return (
    <div style={{
        padding: "10px",
    }}>
        <Balance></Balance>
        <Order></Order>
    </div>
  )
}
