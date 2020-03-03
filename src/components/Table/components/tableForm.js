import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Table, Select, ConfigProvider } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useFormTable } from '@umijs/hooks';
import { formItemLayout } from './config';

const { Option } = Select;

const AppList = props => {
  const { columns, requestData, rowKey, searchFrom, refresh } = props;
  console.log(refresh);
  const { getFieldDecorator } = props.form;
  const [isSearch, setIsSearch] = useState(false);
  const { tableProps, run, search, loading } = useFormTable(
    (p, formData) => requestData({ ...formData, ...p }),
    {
      refreshDeps: [refresh],
      defaultPageSize: 10,
      form: props.form,
      manual: false
    },
  );


  // useEffect(() => {
  //   run();
  // }, [refresh]);

  tableProps.pagination.showQuickJumper = true;
  tableProps.pagination.showSizeChanger = true;
  tableProps.pagination.pageSizeOptions = ['10', '20', '30', '50'];

  const { type, changeType, submit, reset } = search;

  return (
    <ConfigProvider renderEmpty={() => '暂时无数据'}>
      <div>
        <div>refresh====在table组件中=> {refresh}</div>
        {searchFrom ? (
          <Form layout="inline">
            {searchFrom(props.form)}
            <Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  setIsSearch(true);
                  submit();
                }}
                style={{ marginRight: '16px' }}
              >
                搜索
              </Button>
              <Button onClick={reset}>重置</Button>
            </Form.Item>
          </Form>
        ) : null}
        <Table columns={columns} rowKey="id" {...tableProps} />
      </div>
    </ConfigProvider>
  );
};

export default Form.create()(AppList);
