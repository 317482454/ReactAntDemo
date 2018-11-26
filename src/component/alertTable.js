import React, {Component} from 'react';
import {Modal, Button, Form, Table, Row, Col, Input, Cascader} from 'antd';
import axios from '../conf/axiosConf';

const FormItem = Form.Item;

class channel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      total: 0,
      selectedRowKeys: [],
      selectedRows: [],
      pageSize: 10,
    }
  }

  componentDidMount() {
    this.getDate(1)
  }

  getDate(current) {
    axios.get("api/tags?page=" + current).then(data => {
      let selectedRows = this.state.selectedRows;
      let listLength = selectedRows.map((model, index) => {
        return index;
      })
      let list = selectedRows.concat(data.list);
      this.setState({
        list: list,
        total: data.total,
        pageSize: list.length,
        selectedRowKeys: listLength
      });
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  handleReset = () => {
    this.props.form.resetFields();
  }

  onChange(current, pageSize) {
    this.getDate(current)
  }

  setModal1Visible(modal1Visible) {
    this.setState({modal1Visible});
  }

  onChannelSave() {
    this.props.alert.onChannelSave(this.state.selectedRows)
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const options =
      [
        {
          value: 'zhejiang',
          label: 'Zhejiang',

        }, {
        value: 'jiangsu',
        label: 'Jiangsu',
      }];
    const columns =
      [
        {
          title: 'ID',
          dataIndex: 'name',
        }];
    const pagination = {
      position: 'bottom',
      defaultCurrent: 1,
      onChange: this.onChange.bind(this),
      total: this.state.total,
      pageSize: this.state.pageSize
    }
    const state = {
      pagination
    }
    const {selectedRowKeys} = this.state;

    const rowSelection = {
      selectedRowKeys: selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({selectedRowKeys, selectedRows});
      }
    };
    return (
      <Modal
        style={{top: 20}}
        width={"900px"}
        title="弹出表格选择组件"
        visible={this.props.alert.visible}
        footer={null}
        onCancel={() => this.setModal1Visible(false)}>
        <Button onClick={this.onChannelSave.bind(this)} style={{marginBottom: 20}} type="primary">确定</Button>
        <Table rowSelection={rowSelection}  {...state} columns={columns} dataSource={this.state.list}/>
      </Modal>
    )
  }
}


export default Form.create()(channel)
