import React, {useEffect, useState} from "react";
import './LakeDetails.css';
import Badge from "react-bootstrap/Badge";
const imgPath = process.env.PUBLIC_URL + '/assets/';

const LakeDetails = (props) => {

    const [lake, setLake] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/lakes/${props.match.params.id}`)
            .then(response => response.json())
            .then(data => {
                setLake(data);
            })
    }, []);

    if (lake === null) {
        return null
    } else {
        return <>
            <div className="container content">

                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="my-4">Jezioro {lake.name}</h1>
                        <div className="card mt-4">
                            <img className="card-img-top img-fluid" src={`${imgPath}${lake.img}`} alt=""/>
                            <div className="card-body">
                                <span style={{fontSize: '25px', fontWeight: '700'}} className="card-title">Opłata wejściowa na jezioro:<Badge variant="success" style={{fontSize: '25px', marginLeft: '10px'}}>{lake.price} PLN</Badge></span>
                                <p className="card-text" style={{marginTop: '15px'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores,
                                    sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure,
                                    ducimus!</p>
                                <span style={{marginRight: '10px'}}>Ocena użytkowników: </span><span className="text-warning" style={{marginRight: '10px'}}>&#9733; &#9733; &#9733; &#9733; &#9734;</span> 4.0 gwiazdki
                            </div>
                        </div>

                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">Opinie użytkowników</div>
                            <div className="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Dodane przez user10 dnia 13/01/2020 r.</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Dodane przez user10 dnia 13/01/2020 r.</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente
                                    laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint
                                    natus.</p>
                                <small className="text-muted">Dodane przez user10 dnia 13/01/2020 r.</small>
                                <hr/>
                                <a href={'#/lake/' + props.match.params.id + '/reservation'}
                                   className="btn btn-success">Wykup zezwolenie</a>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </>
    }
};

export default LakeDetails;