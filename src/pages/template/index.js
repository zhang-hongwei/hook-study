import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, Select, ConfigProvider } from 'antd';
import { Table } from '@/components/Table';
import { connect } from 'dva';
import { columns } from './config';

let num = 0;
const Page = ({ dispatch }) => {
  let [deps, setDeps] = useState(1);
  const handleClick = () => {
    setDeps((deps += 1));
  };
  return (
    <>
      <Button onClick={handleClick}>测试点击</Button>

      <div>refreshDeps====>{deps}</div>

      <Table
        refresh={deps}
        columns={columns}
        requestData={param => {
          console.log('p===>', param);
          return dispatch({
            type: 'template/getData',
            payload: { pageSize: param.pageSize },
          }).then(res => {
            const { list, total } = res.data;
            return {
              list: list,
              total: total,
            };
          });
        }}
        searchFrom={form => {
          // console.log('form===>', form);
          const { getFieldDecorator } = form;
          return (
            <>
              <Form.Item label="电话">
                {getFieldDecorator('phone1')(<Input placeholder="phone" />)}
              </Form.Item>
            </>
          );
        }}
      ></Table>
    </>
  );
};

export default connect(state => {
  return state;
})(Page);
