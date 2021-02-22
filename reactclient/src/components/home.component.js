import React, { Component } from "react";
import {Dropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import ImageComponent from "./image.component";
import Gallery from "react-grid-gallery";
const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
   
  const IMAGES = [
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" }
      ],
      caption: "Boats (Jeshu John - designerspics.com)"
    },
  
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212
    },
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" }
      ],
      caption: "Boats (Jeshu John - designerspics.com)"
    },
  
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212
    },
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" }
      ],
      caption: "Boats (Jeshu John - designerspics.com)"
    },
  
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212
    },
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 174,
      caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 320,
      thumbnailHeight: 212,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" }
      ],
      caption: "Boats (Jeshu John - designerspics.com)"
    },
  
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 720,
      thumbnailHeight: 212
    }
  ];

export default class home extends Component {
     render() {
        return (
            <div>
                      <div style={divStyle}>

                    
      <Dropdown>
  <Dropdown.Toggle variant="dark" id="dropdown-basic">
    Menu
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item > <Link to="/upload">Upload photo</Link></Dropdown.Item>
    <Dropdown.Item >profile</Dropdown.Item>
    <Dropdown.Item>logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
<h3> My Photos </h3>
<Link to="/upload" className="upload" > Upload </Link>
</div>
<Gallery
      images={IMAGES}
      enableLightbox={true}
      // maxRows={3}
      backdropClosesModal
      // currentImage={3}
      // isOpen={ true}
    />


            <ImageComponent/>
            <footer>
            <div style={divStyle}>
            <Link to = "/albums" className="Album" > My Albums </Link>
            <Link to className="sort" > Sort </Link>
            
            </div>
            </footer>
            </div>

        )
    }}