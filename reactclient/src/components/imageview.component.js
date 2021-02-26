import React, { Component } from "react";
import {DropDown} from 'react-bootstrap';

export default class home extends Component {
    render() { return (
<div >
    <div>
    <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic"> Menu</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item > <Link to="/upload">Upload photo</Link></Dropdown.Item>
            <Dropdown.Item >profile</Dropdown.Item>
            <Dropdown.Item>logout</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    </div>
    <img src={'https://www.indiancinemagallery.net/wp-content/uploads/2018/01/telugu_actress_sravya_hot_stills_green_saree_2b19a35-279x420.jpg'} alt="from-cloud" width='100px' height='150px' />
    </div>
        ) } }