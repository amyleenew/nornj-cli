import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { observable, computed, toJS } from 'mobx';
import { observer, inject } from 'mobx-react';
import nj from 'nornj';
import { registerTmpl } from 'nornj-react';
import { autobind } from 'core-decorators';
import Table from 'flarej/lib/components/antd/table';
import Input from 'flarej/lib/components/antd/input';
import Button from 'flarej/lib/components/antd/button';
import Pagination from 'flarej/lib/components/antd/pagination';
import Tabs from 'flarej/lib/components/antd/tabs';
import Checkbox from 'flarej/lib/components/antd/checkbox';
import Modal from 'flarej/lib/components/antd/modal';
import Tree from 'flarej/lib/components/antd/tree';
import Message from 'flarej/lib/components/antd/message';
import Notification from '../../../utils/notification';
import styles from './#{pageName}#.m.scss';
import ModalFormPage from './modalFormPage.jsx';
import ModalDetailPage from './modalDetailPage.jsx';

//页面容器组件
@registerTmpl('#{pageName | pascal}#')
@inject('store')
@observer
export default class #{pageName | pascal}# extends Component {
  @observable detailModalVisible = false;
  @observable inputRole = '';
  @observable detailData = [];
  @observable selectedRowKeys = [];
  @observable selectedRows = [];

  componentDidMount() {
    const { store: { #{pageName}# } } = this.props;

    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      #{pageName}#.getRoleManagementData(),
      #{pageName}#.getRoleMenuTree().then(() => #{pageName}#.initTree())
    ]).then(() => {
      closeLoading();
    });
  }

  @autobind
  onInputRole(e) {
    this.inputRole = e.target.value;
  }

  @autobind
  onSearch() {
    if (this.inputRole == '') {
      const closeLoading = Message.loading('正在获取数据...', 0);
      Promise.all([
        this.props.store.#{pageName}#.getRoleManagementData(),
      ]).then(() => {
        closeLoading();
      });
    } else {
      const { store: { #{pageName}# } } = this.props;
      const searchRole = #{pageName}#.tableDataO.filter(n => n.name.indexOf(this.inputRole.trim()) > -1);
      #{pageName}#.setTableData(searchRole);
    }
  }

  @autobind
  onAddRole() {
    const { store: { #{pageName}# } } = this.props;
    #{pageName}#.setAddModalVisible(true);
    #{pageName}#.setDisable(true);
    #{pageName}#.setActiveKey('tab1');
    #{pageName}#.setAddInputRole('');
    #{pageName}#.setAddInputDes('');
  }

  @autobind
  onDeleteRole() {
    const { store: { #{pageName}# } } = this.props;
    if (this.selectedRowKeys.length == 0) {
      Notification.error({ description: '请勾选要删除的角色！', duration: 3 });
    } else {
      Modal.confirm({
        title: '你确认要删除角色吗？',
        onOk: () => {
          const closeLoading = Message.loading('正在获取数据...', 0);
          const roleId = this.selectedRows.map((item) => item.roleId);

          Promise.all([
            #{pageName}#.deleteRole({ roleId: roleId })
          ]).then(() => {
            #{pageName}#.getRoleManagementData();
          }).then(() => {
            this.selectedRowKeys = [];
            closeLoading();
          });
        }
      });
    }
  }

  @computed get tableColumns() {
    return [{
      title: '序号',
      dataIndex: 'key',
    }, {
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '角色描述',
      dataIndex: 'describe',
    }, {
      title: '创建时间',
      dataIndex: 'cTime',
    }, {
      title: '修改时间',
      dataIndex: 'mTime',
    }, {
      title: '操作',
      dataIndex: 'handler',
      render: (text, record, index) => (
        <span>
          <a href="javascript:;" onClick={() => this.onEdit(record, index)} className="btn-link">编辑</a>
          <a href="javascript:;" onClick={() => this.onDetail(record, index)} className="btn-link">用户明细</a>
        </span>
      ),
    }];
  }

  @autobind
  onEdit(record, index) {
    const { store: { #{pageName}# } } = this.props;
    #{pageName}#.setEditModalVisible(true);
    #{pageName}#.setSaveBtnDisabled(true);
    #{pageName}#.setActiveKey('tab1');
    #{pageName}#.setAddInputRole(record.name);
    #{pageName}#.setAddInputDes(record.describe);
    #{pageName}#.setRoleId(record.roleId);
    #{pageName}#.setDisable(false);

    const closeLoading = Message.loading('正在获取数据...', 0);
    Promise.all([
      #{pageName}#.getRoleMenuTree({ roleId: record.roleId }).then(() => #{pageName}#.initTree()),
    ]).then(() => {
      closeLoading();
    });
  }

  @autobind
  onDetail(record, index) {
    const { store: { #{pageName}# } } = this.props;
    #{pageName}#.setDetailModalVisible(true);
    #{pageName}#.setDetailData(record.users);
  }

  getRowSelection() {
    return {
      selectedRowKeys: this.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
      }
    };
  }

  render() {
    const { store: { #{pageName}# } } = this.props;

    return (
      <div className={styles.#{pageName}#}>
        <h2>角色管理 #{pageName}#</h2>
        <div className={styles.handlerBox}>
          <span className={styles.lable}>角色名称</span>
          <Input className={styles.input} value={this.inputRole} onChange={this.onInputRole} />
          <Button className="btn" onClick={this.onSearch}>查询</Button>
          <Button className="btn" onClick={this.onAddRole}>新增</Button>
          <Button className="btn" onClick={this.onDeleteRole}>删除</Button>
        </div>

        <Table rowSelection={this.getRowSelection()}
          columns={toJS(this.tableColumns)}
          dataSource={toJS(#{pageName}#.tableData)}
          bordered />

        <ModalFormPage tabName="增加角色" />
        <ModalFormPage tabName="编辑角色" />
        <ModalDetailPage />
      </div>
    );
  }
}