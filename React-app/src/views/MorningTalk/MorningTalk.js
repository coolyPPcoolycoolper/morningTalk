import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, CardHeader, CardBody, Row, Col, Form } from "reactstrap";
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import { v4 as uuidv4 } from 'uuid';

import Dropdown from '../../components/Dropdown/Dropdown';
import CardList from '../MorningTalk/CardList';
import { formatDate } from '../MorningTalk/utils.js';
import { listMM, member } from '../MorningTalk/constants';
import config from '../../config.js';
import PanelHeader from "../../components/PanelHeader/PanelHeader";

const controller = 'morningTalk'

function MorningTalk() {
    const [year, setYear] = useState(formatDate(new Date()).split("/")[2]);
    const [month, setMonth] = useState();
    const [people, setPeople] = useState('all');
    const [dataMorningTalk, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);
    const [peoples, setPeoples] = useState([]);
    useEffect(() => {
        setPeoples([{ name: 'ทั้งหมด', value: 'all' }, ...member.map(item => ({ name: item, value: item }))]);
        setMonths(listMM);
        const toDay = formatDate(new Date()).split("/");
        setMonth(listMM[Number(toDay[1]) - 1].value);
        setYear(toDay[2]);
        // fetchData(toDay[2], listMM[Number(toDay[1]) - 1].value, toDay);
    }, []);

    const fetchData = (year, month, toDay) => {
        axios.get(`${config.apiBaseUrl}/${controller}/get/${year}/${month}`, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        })
            .then((res) => {
                console.log("++ res", res);
                const uniqueDates = [...new Set(res.data.data.map(item => item.date))];
                if (!uniqueDates.includes(toDay.join("/")) && month == formatDate(new Date()).split("/")[1]) {
                    uniqueDates.push(toDay.join("/"));
                    res.data.data.push(...member.map(item => ({
                        date: formatDate(new Date()),
                        detail: '',
                        name: item,
                        problem: '',
                        id: uuidv4()
                    })));
                }
                setYears([...new Set(res.data.dataAll.map(x => x.date.split("/")[2]))].map(year => ({ name: year, value: year })));
                uniqueDates.sort((a, b) => {
                    const [dayA, monthA, yearA] = a.split("/").map(Number);
                    const [dayB, monthB, yearB] = b.split("/").map(Number);
                    return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
                });
                const newData = uniqueDates.map(uDate => ({
                    date: uDate,
                    data: res.data.data.filter(x => x.date === uDate)
                }));
                setData(newData);
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        if (month && year) {
            fetchData(year, month, formatDate(new Date()).split("/"));
        }
    }, [year, month]); // Runs only when year or month changes


    const handleInputChange = (cardIndex, pIndex, field, value) => {
        const newData = dataMorningTalk;
        newData[cardIndex].data[pIndex][field] = value;
        setData(newData);
    };

    const submit = (event) => {
        event.preventDefault();
        axios.post(`${config.apiBaseUrl}/${controller}/save`, dataMorningTalk, { headers: { 'Content-Type': 'application/json' } })
            .then(res => { if (res.data) notify('tr', 2); });
    };

    const notificationAlert = React.useRef();
    const notify = (place, color) => {
        const options = {
            place,
            message: <div><div>{color === 2 ? "Success." : ""}</div></div>,
            type: color === 2 ? "success" : "info",
            icon: "now-ui-icons ui-1_bell-53",
            autoDismiss: 7
        };
        notificationAlert.current.notificationAlert(options);
    };

    return (
        <>
            <PanelHeader size="sm" />
            <Button className="btn-save" color="info" size="lg" onClick={submit}>SAVE</Button>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <Row>
                                    <Col md="6"><h5 className="title">Update Morning Talk</h5></Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <Row>
                                        <Col md="3" sm="6">
                                            <label>Year</label>
                                            {years.length > 0 && <Dropdown options={years} setValue={year} onSelectionChange={setYear} />}
                                        </Col>
                                        <Col md="3" sm="6">
                                            <label>Months</label>
                                            {months.length > 0 && <Dropdown options={months} setValue={month} onSelectionChange={setMonth} />}
                                        </Col>
                                        <Col md="3" sm="6">
                                            <label>People</label>
                                            {peoples.length > 0 && <Dropdown options={peoples} setValue={people} onSelectionChange={setPeople} />}
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <CardList data={dataMorningTalk} handleInputChange={handleInputChange} people={people} />
            </div>
            <NotificationAlert ref={notificationAlert} />
        </>
    );
}

export default MorningTalk;
