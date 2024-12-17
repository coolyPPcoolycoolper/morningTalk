// components/CardList.js
import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Input } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../MorningTalk/utils';

const CardList = ({ data, handleInputChange, people }) => (
    <Row>
        <Col md="12">
            {data.map((card, cardIndex) => (
                <Card key={uuidv4()}>
                    <CardHeader>
                        <h3>{card.date}</h3>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {card.data.map((p, pIndex) => (
                                (people === "all" || people === p.name) && (
                                    <Col key={uuidv4()}>
                                        <label style={{ fontSize: '1.5rem' }}>{p.name}</label>
                                        <Input
                                            defaultValue={p.detail}
                                            placeholder="วันนี้ทำอะไร"
                                            rows={4}
                                            type="textarea"
                                            onChange={(value) => handleInputChange(cardIndex, pIndex, 'detail', value.target.value)}
                                        />
                                        {card.date !== formatDate(new Date()) && (
                                            <Input
                                                defaultValue={p.problem}
                                                placeholder="มีปัญหาอะไรไหม"
                                                rows={3}
                                                type="textarea"
                                                onChange={(value) => handleInputChange(cardIndex, pIndex, 'problem', value.target.value)}
                                            />
                                        )}
                                    </Col>
                                )
                            ))}
                        </Row>
                    </CardBody>
                </Card>
            ))}

        </Col>
    </Row>
);

export default CardList;
