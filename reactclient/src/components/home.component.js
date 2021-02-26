import React, { Component } from "react";
import {Button} from 'react-bootstrap'
import Card from "react-bootstrap/Card";

export default class home extends Component {
     render() {
        return (
            <div >
            <p >
            <input className="upload-button" type="button" value="+" />
            <input className="menu-button" type="button" value="Menu" />
            </p>
            <h1> welcome</h1>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={require('./resources/pic1.jpg')} />
                <Card.Body>
                    <Card.Title></Card.Title> 
                    <Button variant="primary">menu</Button>
                </Card.Body>
            </Card>
            <img src={require('./resources/pic1.jpg')} alt="pic1" width='100px' height='150px' />
            <img src={require('./resources/pic2.jpg')} alt="pic2" width='100px' height='150px' />
            <img src={require('./resources/pic3.jpg')} alt="pic3" width='100px' height='150px' />
            <img onClick="" src={require('./resources/pic2.jpg')} alt="pic2" width='100px' height='150px' />
            <img src={'https://www.indiancinemagallery.net/wp-content/uploads/2018/01/telugu_actress_sravya_hot_stills_green_saree_2b19a35-279x420.jpg'} alt="from-cloud" width='100px' height='150px' />
            </div>
        )
    }
    }