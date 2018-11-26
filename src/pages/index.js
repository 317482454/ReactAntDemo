import {Card, Button} from 'antd';
import React, {Component} from 'react';

import AlertTable from '../component/alertTable'

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      total: 0,
      visible: false
    }
  }

  onChannelSave = (list) => {
    console.log(list, "list");
    this.setState({
      visible: false
    })
  }

  onShow() {
    this.setState({
      visible: true
    })  }

  render() {
    const alert = {
      onChannelSave: this.onChannelSave.bind(this),//获取选择的数据
      visible: this.state.visible//是否显示弹出框
    }
    return (
      <Card
        title="弹出table选择"
        bordered={false}>
        <Button onClick={this.onShow.bind(this)} type="primary">点击显示</Button>
        <AlertTable alert={alert}></AlertTable>
      </Card>
    )

  }
}


