import React from 'react';
import { Col, Input } from 'antd';

const InputField = ({ placeholder, name, value, onChange, span }) => {
    return (
        <Col className="gutter-row" span={span}>
            <label htmlFor={name}>{placeholder}:</label>
            <Input placeholder={placeholder} name={name} value={value} onChange={onChange} required />
        </Col>
    );
}

export default InputField;