import React, {useEffect, useState} from "react";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";


const Reservation = (props) => {

    const [reservation, setReservation] = useState({
        lakeId: props.match.params.id,
        name: "",
        surname: "",
        email: "",
        date: "",
        option: 0,
        position: 0,
        permission: 0,
        method: 0,
        limit: 0
    });

    const [commonCosts, setCommonCosts] = useState(null);
    const [validated, setValidated] = useState(false);
    const [sum, setSum] = useState(0);
    const [lake, setLake] = useState(null);
    const [regulation, setRegulation] = useState(false);
    const [popUp, setPopUp] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/commonCosts`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setCommonCosts(data);
            });

        fetch(`${process.env.REACT_APP_API_URL}/lakes/${props.match.params.id}`, {
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

    const handleName = (name) => {
        setReservation(prevState => {
            return {
                ...prevState,
                name: name
            }
        });
    };

    const handleSurname = (surname) => {
        setReservation(prevState => {
            return {
                ...prevState,
                surname: surname
            }
        });
    };

    const handleEmail = (email) => {
        setReservation(prevState => {
            return {
                ...prevState,
                email: email
            }
        })
    };

    const handleDate = (date) => {
        setReservation(prevState => {
            return {
                ...prevState,
                date: date
            }
        });
    };

    const pzwChange = (option) => {
        setReservation(prevState => {
            return {
                ...prevState,
                option: option,
            };
        });
    };

    const changePosition = (position) => {
        setReservation(prevState => {
            return {
                ...prevState,
                position: position
            };
        });
    };

    const permissionLong = (permission) => {
        setReservation(prevState => {
            return {
                ...prevState,
                permission: permission
            };
        });
    };

    const fishingMethod = (method) => {
        setReservation(prevState => {
            return {
                ...prevState,
                method: method
            };
        });
    };

    const weightLimit = (limit) => {
        setReservation(prevState => {
            return {
                ...prevState,
                limit: limit
            };
        });
    };

    const countCost = () => {
        if (lake !== null) {
            setSum(parseInt(lake.price) + parseInt(reservation.option) + parseInt(reservation.position) + parseInt(reservation.permission) + parseInt(reservation.method) + parseInt(reservation.limit))
        }
        else {
            return null
        }
    };

    const [showCorrect, setShowCorrect] = useState(false);
    const [showWrong, setShowWrong] = useState(false);

    const handleCloseCorrect = () => {
        setShowCorrect(false)
    };

    const handleCloseWrong = () => setShowWrong(false);

    const handleClickSubmit = (event) => {
        event.preventDefault();
        if (reservation.name !== "" && reservation.surname !== "" && (reservation.email !== "" && reservation.email.includes('@')) && reservation.date !== "" && regulation !== false) {
            fetch(`${process.env.REACT_APP_API_URL}/reservations`, {
                method: 'POST',
                body: JSON.stringify(reservation),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.status === 201) {
                            setShowCorrect(true);
                        }
                    }
                )
                .catch(error => {
                    console.log(error);
                });
        } else {
            setShowWrong(true);
            if (popUp.includes("imię")) {
                popUp.indexOf('imię') !== -1 && popUp.splice(popUp.indexOf('imię'), 1);
            }
            if (reservation.name === "") {
                setPopUp(["imię"]);
            }
            if (popUp.includes("nazwisko")) {
                popUp.indexOf('nazwisko') !== -1 && popUp.splice(popUp.indexOf('nazwisko'), 1);
            }
            if (reservation.surname === "") {
                setPopUp(prevState => [...prevState, "nazwisko"])
            }
            if (popUp.includes("email")) {
                popUp.indexOf('email') !== -1 && popUp.splice(popUp.indexOf('email'), 1);
            }
            if (!reservation.email.includes('@')) {
                setPopUp(prevState => [...prevState, "email"])
            }
            if (popUp.includes("datę")) {
                popUp.indexOf('datę') !== -1 && popUp.splice(popUp.indexOf('datę'), 1);
            }
            if (reservation.date === "") {
                setPopUp(prevState => [...prevState, "datę"])
            }
            if (popUp.includes("zaakceptuj regulamin")) {
                popUp.indexOf('zaakceptuj regulamin') !== -1 && popUp.splice(popUp.indexOf('zaakceptuj regulamin'), 1);
            }
            if (regulation === false) {
                setPopUp(prevState => [...prevState, "zaakceptuj regulamin"])
            }
        }
    };

    const handleChangeRegulation = () => {
        setRegulation(!regulation);
    };

    return <>
        <div className="container content" style={{height: '87vh'}}>
            {lake !== null ? <>
                <h4 style={{marginTop: '40px', marginBottom: '20px'}}>Zezwolenie dla jeziora: {lake.name}</h4>
                <h5>Opłata wejściowa na jezioro: {lake.price} PLN</h5>
            </> : null}
            <div className="row">
                <div className="col-lg-12">
                    <Form className='content' noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                <Form.Label>Podaj imię</Form.Label>
                                <Form.Control required type="text" placeholder="Imię"
                                              onChange={(event) => handleName(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">Podaj imię.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                <Form.Label>Podaj nazwisko</Form.Label>
                                <Form.Control required type="text" placeholder="Nazwisko"
                                              onChange={(event) => handleSurname(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">Podaj nazwisko.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                                <Form.Label>Adres email</Form.Label>
                                <InputGroup>
                                    <Form.Control required type="email" placeholder="email"
                                                  aria-describedby="inputGroupPrepend"
                                                  onChange={(event) => handleEmail(event.target.value)}/>
                                    <Form.Control.Feedback type="invalid">Podaj adres email.</Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Czy jesteś zrzeszony w PZW?</Form.Label>
                                    <Form.Control as="select" custom
                                                  onChange={(event) => pzwChange(event.target.value)}>
                                        <option value="0"></option>
                                        {commonCosts && commonCosts.pzw.map((option) => <option
                                            value={option.optionValue} key={option.optionName}>{option.optionName}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom05">
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Wybierz stanowisko</Form.Label>
                                    <Form.Control as="select" custom
                                                  onChange={(event) => changePosition(event.target.value)}>
                                        <option value="0"></option>
                                        {lake && lake.choosePosition.map((position) => <option
                                            value={position.positionCost} key={position.numberOfPosition}>{position.numberOfPosition}</option>)}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom06">
                                <Form.Label>Wybierz datę</Form.Label>
                                <input required type="date" id="example-datetime-local-input"
                                       className="form-control"
                                       onChange={(event) => handleDate(event.target.value)}/>
                                <Form.Control.Feedback type="invalid">Wybierz datę.</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} md="4" controlId="validationCustom07">
                                <Form.Label>Wybierz długość zezwolenia</Form.Label>
                                <Form.Control as="select" custom
                                              onChange={(event) => permissionLong(event.target.value)}>
                                    <option value="0"></option>
                                    {commonCosts && commonCosts.fishingCosts.map((costs) => <option
                                        value={costs.dayCost}>{costs.dayValue}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom08">
                                <Form.Label>Wybierz metodę połowu</Form.Label>
                                <Form.Control as="select" custom
                                              onChange={(event) => fishingMethod(event.target.value)}>
                                    <option value="0"></option>
                                    {commonCosts && commonCosts.fishingMethods.map((method) => <option
                                        value={method.spinningMethodCost}>{method.spinningMethod}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom09">
                                <Form.Label>Wybierz limit połowu</Form.Label>
                                <Form.Control as="select" custom
                                              onChange={(event) => weightLimit(event.target.value)}>
                                    <option value="0"></option>
                                    {commonCosts && commonCosts.weightLimits.map((limit) => <option
                                        value={limit.fishingWeightCost}>{limit.fishingWeight}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Check required label="Akceptuję regulamin łowiska" checked={regulation}
                                        onChange={handleChangeRegulation}/>
                        </Form.Group>
                        <span>Łączna kwota do zapłaty: <Badge variant="secondary"
                                                              style={{
                                                                  fontSize: '20px',
                                                                  marginLeft: '20px'
                                                              }}>{sum} PLN</Badge></span><br/>
                        <br/>
                        <Button variant="primary" type="submit" onClick={(event) => handleClickSubmit(event)}>Wykup zezwolenie</Button>
                        <Modal show={showCorrect} onHide={handleCloseCorrect}>
                            <Modal.Header closeButton>
                                <Modal.Title>{reservation.name} {reservation.surname}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Dziękujemy za wykupienie zezwolenia od dnia: <span
                                style={{fontWeight: '700', color: 'red'}}>{reservation.date}</span>. Wkrótce
                                otrzymasz maila z potwierdzeniem i szczegółami zamówienia.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={handleCloseCorrect}>Zamknij</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showWrong} onHide={handleCloseWrong}>
                            <Modal.Header closeButton>
                                <Modal.Title>Wypełnij brakujące dane.</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Uzupełnij:
                                {popUp.map((info) => <><span style={{color: "red"}}> {info}</span><span> / </span></>)}
                                <span><br/>Reszta pól opcjonalnie.</span>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleCloseWrong}>Zamknij</Button>
                            </Modal.Footer>
                        </Modal>
                    </Form>
                </div>
            </div>
        </div>
    </>
};

export default Reservation;