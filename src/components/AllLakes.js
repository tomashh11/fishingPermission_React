import React, {useEffect, useState} from "react";
import './AllLakes.css';
const imgPath = process.env.PUBLIC_URL + '/assets/';

const AllLakes = () => {

    const [lakes, setLakes] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/lakes`)
            .then(response => response.json())
            .then(data => {
                setLakes(data);
            })
    }, []);

    if (lakes === null) {
        return null
    } else {
        return <>
            <div className="row text-center">

                {lakes.map(lake => {
                    return <div key={lake.id} className="col-lg-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <img className="card-img-top" src={`${imgPath}${lake.img}`} alt=""/>
                            <div className="card-body">
                                <h4 className="card-title">j. {lake.name}</h4>
                                <p className="card-text">{lake.description}</p>
                            </div>
                            <div className="card-footer">
                                <a href={'#/lake/'+ lake.id} className="btn btn-primary">Informacje nt. łowiska</a>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </>
    }
};

export default AllLakes;