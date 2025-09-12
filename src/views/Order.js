import React from 'react'

import { Card, Col, Row, Table } from 'antd';
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


export default function Order() {
  const order = useSelector((state) => state.order);
  console.log(order) 

    const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

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


  return (
    <div style={{marginTo: "10px"}}>
        <Row>
            <Col span={8}>
                <Card title="已完成交易" variant="borderless" style={{  }}>
                  <Table dataSource={order.FillOrders} columns={columns} rowKey={item => item.id} />;
                </Card>
            </Col>
             <Col span={8}>
                <Card title="交易中-我创建的订单" variant="borderless" style={{  }}>
                  <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} />;
                </Card>
            </Col>
             <Col span={8}>
                <Card title="交易中-其他人的订单" variant="borderless" style={{  }}>
                   <Table dataSource={dataSource} columns={columns} rowKey={item => item.id} />;
                </Card>
            </Col>
        </Row>
    </div>
  )
}
