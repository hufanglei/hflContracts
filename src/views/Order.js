import React from 'react'

import { Card, Col, Row, Table, Button } from 'antd';
import { useSelector } from 'react-redux';
import { render } from '@testing-library/react';
import moment from 'moment';

function convertTime(t) {
  return moment(t*1000).format('YYYY-MM-DD HH:mm:ss')
}

function convert(n) {
    if(!window.web) return 
    return window.web.web3.utils.fromWei(n, 'ether')
}


function getRenderOrders(order, type) {
  if(!window.web) return []
  const account = window.web.account
  // 1. 排除已完成 以及 取消订单
  // 2. account
  let filterIds = [...order.FillOrders, ...order.CancelOrders].map(item => item.id)
  console.log(filterIds)
  let pendingOrders = order.AllOrders.filter(item => !filterIds.includes(item.id))
  console.log(pendingOrders)
  if(type === 1) {
    pendingOrders = pendingOrders.filter(item => item.user === account)
  } else{
    pendingOrders = pendingOrders.filter(item => item.user !== account)
  }
  return pendingOrders
}

export default function Order() {
  const order = useSelector((state) => state.order);
  console.log(order) 

    
  const columns = [
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp) => <div> { timestamp && convertTime(timestamp)} </div>,
    },
    {
      title: 'HFL',
      dataIndex: 'amountGet',
      key: 'amountGet',
      render: (amountGet) => <b> { amountGet && convert(amountGet)} </b>,
    },
    {
      title: 'ETH',
      dataIndex: 'amountGive',
      key: 'amountGive',
      render: (amountGive) => <b> { amountGive && convert(amountGive)} </b>,
    },
  ];
const columns1 = [
  ...columns,
  {
    title: '操作',
    // dataIndex: 'action',
    // key: 'action',
    render: (item) => <Button type="primary" onClick={
      () => {
        // console.log(item.id)
        const { exchange, account }= window.web
        exchange.methods.cancelOrder(item.id).send({from: account});
      }
    }> 取消 </Button>,
  },

];

const columns2 = [
  ...columns,
  {
    title: '操作',
    // dataIndex: 'action',
    // key: 'action',
    render: (item) => <Button danger onClick={
      () => {
        // console.log(item.id)
        const { exchange, account }= window.web
        exchange.methods.fillOrder(item.id).send({from: account});
      }
    }
    > 买入 </Button>,
  },

];

  return (
    <div style={{marginTo: "10px"}}>
        <Row>
            <Col span={8}>
                <Card title="已完成交易" variant="borderless" style={{ margin: 10  }}>
                  <Table dataSource={order.FillOrders} columns={columns} rowKey={item => item.id} />;
                </Card>
            </Col>
             <Col span={8}>
                <Card title="交易中-我创建的订单" variant="borderless" style={{  margin: 10  }}>
                  <Table dataSource={getRenderOrders(order,1)} columns={columns1} rowKey={item => item.id} />;
                </Card>
            </Col>
             <Col span={8}>
                <Card title="交易中-其他人的订单" variant="borderless" style={{  margin: 10  }}>
                   <Table dataSource={getRenderOrders(order,2)} columns={columns2} rowKey={item => item.id} />
                </Card>
            </Col>
        </Row>
    </div>
  )
}
