import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Dropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import UploadImagePage from './UploadImagePage'

const drawerWidth = 240;
const cards = ["https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png","https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png"];
   
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.error.dark,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    height: 0,
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));


export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    images : [],
    imageids :[],
    imageid : null,
    id: this.props.username
    }
  }


render() {
  return (        
<div>  
<div>

<h3>Welcome {this.props.username}</h3>
<div>
<UploadImagePage user={this.props.username}/>
</div>
 <Dropdown>
        <Dropdown.Toggle style = {{color:'red'}} > Menu</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item className="button" >profile</Dropdown.Item>
            <Dropdown.Item><Link  className="button" to = "/"> logout </Link></Dropdown.Item>
        </Dropdown.Menu>
  </Dropdown>
</div>
<h3> My Photos </h3>
<main className={useStyles.content}>
        <div className={useStyles.toolbar} />
            <Container className={useStyles.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2} padding-down = {10}>
               {cards.map((card) => (
                 <Grid item key={card}>
                 <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={card} />
                <Card.Body>
                    <Card.Title></Card.Title> 
                    <Link to="/share" className="button">share</Link>
                    <Button variant="primary" className= "button" onClick = {this.handledownload}>download</Button>
                </Card.Body>
            </Card>
            </Grid>
               ))}
            </Grid>
            </Container>
            </main>
        </div>
)}}
    
    
    