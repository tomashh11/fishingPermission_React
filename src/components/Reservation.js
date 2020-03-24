import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";


const Reservation = (props) => {

    const [commonCosts, setCommonCosts] = useState(null);
    const [validated, setValidated] = useState(false);
    const [option, setOption] = useState(0);
    const [position, setPosition] = useState(0);
    const [permission, setPermission] = useState(0);
    const [method, setMethod] = useState(0);
    const [limit, setLimit] = useState(0);
    const [sum, setSum] = useState(0);
    const [lake, setLake] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/commonCosts`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setCommonCosts(data);
            });

        fetch(`http://localhost:3000/lakes/${props.match.params.id}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setLake(data);
            })
    }, []);

    useEffect(() => {
        countCost();
    });

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const pzwChange = (option) => {
        setOption(option);
    };

    const changePosition = (position) => {
        setPosition(position);
    };

    const permissionLong = (permission) => {
        setPermission(permission);
    };

    const fishingMethod = (method) => {
        setMethod(method);
    };

    const weightLimit = (limit) => {
        setLimit(limit);
    };

    const countCost = () => {
        if (lake !== null) {
            setSum(parseInt(lake.price) + parseInt(option) + parseInt(position) + parseInt(permission) + parseInt(method) + parseInt(limit))
        }
        else {
            return null
        }
    };

    const handleClickSum = () => {
    };

    return <>
        <div className="container content">
            {lake !== null ? <>
                <h4>Rezerwacja dla jeziora: {lake.name}</h4>
                <h5>Opłata wejściowa na jezioro: {lake.price} PLN</h5>
            </> : null}
            <div className="row">
                <div className="col-lg-12">
                    <Form className='content' noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Podaj imię</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Imię"
                                />
                                <Form.Control.Feedback>Wypełnione poprawnie!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Podaj nazwisko</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nazwisko"
                                />
                                <Form.Control.Feedback>Wypełnione poprawnie!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Adres email</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="email"
                                        placeholder="email"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Podaj adres email.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Czy jesteś zrzeszony w PZW?</Form.Label>
                                    <Form.Control as="select" custom
                                                  onChange={(event) => pzwChange(event.target.value)}>
                                        {
                                            commonCosts !== null
                                                ? commonCosts.pzw.map((option) => <option
                                                    value={option.optionValue}>{option.optionName}</option>)
                                                : null
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Wybierz stanowisko</Form.Label>
                                    <Form.Control as="select" custom
                                                  onChange={(event) => changePosition(event.target.value)}>
                                        {
                                            lake !== null
                                                ? lake.choosePosition.map((position) => <option
                                                    value={position.positionCost}>{position.numberOfPosition}</option>)
                                                : null
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom06">
                                <Form.Label>Wybierz datę</Form.Label>
                                <input type="date" id="example-datetime-local-input" className="form-control"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom07">
                                <Form.Label>Wybierz długość zezwolenia</Form.Label>
                                <Form.Control as="select" custom
                                              onChange={(event) => permissionLong(event.target.value)}>
                                    {commonCosts !== null
                                        ? commonCosts.fishingCosts.map((costs) => <option
                                            value={costs.dayCost}>{costs.dayValue}</option>)
                                        : null}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom08">
                                <Form.Label>Wybierz metodę połowu</Form.Label>
                                <Form.Control as="select" custom
                                              onChange={(event) => fishingMethod(event.target.value)}>
                                    {commonCosts !== null
                                        ? commonCosts.fishingMethods.map((method) => <option
                                            value={method.spinningMethodCost}>{method.spinningMethod}</option>)
                                        : null}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom09">
                                <Form.Label>Wybierz limit połowu</Form.Label>
                                <Form.Control as="select" custom onChange={(event) => weightLimit(event.target.value)}>
                                    {commonCosts !== null
                                        ? commonCosts.weightLimits.map((limit) => <option
                                            value={limit.fishingWeightCost}>{limit.fishingWeight}</option>)
                                        : null}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Check
                                required
                                label="Akceptuję regulamin łowiska"
                                feedback="You must agree before submitting."
                            />
                        </Form.Group>
                        <span>Łączna kwota do zapłaty: {sum} PLN</span><br/>
                        <br/>
                        <Button type="submit" onClick={handleClickSum}>Wykup zezwolenie</Button>
                    </Form>
                </div>
            </div>
        </div>
    </>
};

export default Reservation;