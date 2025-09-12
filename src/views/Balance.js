import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setTokenWallet } from '../redux/slices/balanceSlice'

import { Card, Col, Row, Statistic } from 'antd';

function convert(n) {
    if(!window.web) return 
    return window.web.web3.utils.fromWei(n, 'ether')
}

export default function Balance() {

    const {
        TokenWallet,
        EtherWallet,
        EtherExchange,
        TokenExchange
    } = useSelector(state => state.balance)

    return (
      <div>
          <Row gutter={16}>
            <Col span={6}>
              <Card hoverable={true}>
                <Statistic
                  title="钱包中以太币"
                  value={convert(EtherWallet)}
                  precision={2}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<div>ETH</div>}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable={true}>
                <Statistic
                  title="钱包中HFL币"
                  value={convert(TokenWallet)}
                  precision={3}
                  valueStyle={{ color: '#1677ff' }}
                  prefix={<div>HFL</div>}
                />
              </Card>
            </Col>
             <Col span={6}>
              <Card hoverable={true}>
                <Statistic
                  title="交易所中以太币"
                  value={convert(EtherExchange)}
                  precision={2}
                  valueStyle={{ color: '#faad14' }}
                  prefix={<div>ETH</div>}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card hoverable={true}>
                <Statistic
                  title="交易所中HFL币"
                  value={convert(TokenExchange)}
                  precision={3}
                  valueStyle={{ color: '#cf1332' }}
                  prefix={<div>HFL</div>}
                />
              </Card>
            </Col>
          </Row>
      </div>
    )
}
