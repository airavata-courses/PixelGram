import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Dropdown} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {Router} from "react-router-dom"
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
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
const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};


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
componentDidMount(){
  //axios.get(`/${id}`)
  //.then(res => {
    //const persons = res.data;
   // this.setState({images});
  //})
  //axios.post("http://localhost:5003/userdetails", { username:this.props.user })
    //  .then(function (response) {
      //  userid = response.data.userid;
        //console.log(userid)
  //axios.get(`http://localhost:5004/gdrive/upload/userid`)
//.then(response => {
//this.imageids = response.data
//})
//.catch(function(error){
 // console.log(error.message)
//}); })
//.catch(function(error){
  //console.log(error.message)
//});

}
//handleshare 
//handledownload 

 //abc = this.imageids.length

  render() {
  return (
          
 <div>  
<div style={divStyle}>
  <h3>Welcome {this.props.username}</h3>
<h3> My Photos </h3>
<UploadImagePage user={this.props.username}/>
<Dropdown>
        <Dropdown.Toggle> Menu</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item >profile</Dropdown.Item>
            <Dropdown.Item><Link to = "/login"> logout </Link></Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    </div>
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
    
    
    