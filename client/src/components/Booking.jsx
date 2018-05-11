import React from 'react';
import $ from 'jquery';
import Stars from './Stars.jsx';
import Form from './Form.jsx';
import Finding from './Finding.jsx';
import { Container } from 'semantic-ui-react';
import styles from '../styles.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const axios = require('axios');

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const GET_ROOM_QUERY = gql`
  query Room($room_id: Int!) {
    Room(room_id: $room_id) {
      review_grade
      review_count
      room_id
      room_rate
      host_name
      booked_dates
    }
  }
`

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      room: {
        room_id: this.props.room,
      },
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.getRoomData();
    window.addEventListener('scroll', this.handleScroll);
  }

  // fetch new room id from the server
  componentDidUpdate(prevProps) {
    // if (prevProps.room !== this.props.room) {
    //   this.getRoomData();
    // }
  }

  // Fetch this page's room data
  getRoomData() {
    // webpack -p => 'production' & webpack -d => 'development' env swtich
    // const url = (process.env.NODE_ENV === 'production') ? 'http://ec2-184-72-109-180.compute-1.amazonaws.com' : 'http://localhost:7777'; 
  
    // if (process.env.NODE_ENV !== 'production') {
    //    console.log('Looks like we are in development mode!');
    // }

    // axios.get(`${url}/booking/${this.state.room.room_id}`)
    //   .then((items) => {
    //     this.setState({ room: items.data });
    //   })
    //   .catch(err => console.error(err));
    client
      .query({
        query: GET_ROOM_QUERY,
        variables: { room_id: this.state.room.room_id }
      })
      .then((result) => {
        console.log(result.data.Room);
        this.setState({ room: result.data.Room });
      });
  }

  handleScroll() {
    let scrollHeight = $(document).height(),
        scrollTop = $(window).scrollTop(),
        offsetTop = $('#images').height(),
        offsetBottom = $('#listings').height(),
        positionTop = $('#container').offset().top,
        booking = $('#container').height(),
        scrollLimit = ($('#content').height() + offsetTop) - booking;

    // Stops booking module before the listings module at the bottom
    if (window.scrollY >= scrollLimit) {
       // The sidebar has reached the bottom
      document.getElementById('container').style.position = 'absolute';
      document.getElementById('container').style.bottom = `0px`;
      $('#container').css('top', 'initial');
      // fix module's position to scroll bar while scrolling
    } else if (window.scrollY >= offsetTop) {
      document.getElementById('container').style.position = 'fixed';
      document.getElementById('container').style.top = '75px';
      $('#container').css('bottom', 'initial');
      this.setState({ scrolled: true });
      // Stops booking module before the image module at the top 
    } else if (window.scrollY < offsetTop) {
      document.getElementById('container').style.position = 'absolute';
      document.getElementById('container').style.top = `0px`;
      $('#container').css('bottom', 'initial');
      this.setState({ scrolled: false });
    }

  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div id="container" onScroll={this.handleScroll} className={styles.container}>
          <div className={styles.component}>       
              { !this.state.room.room_rate ? 
                <span className={styles.dotContainer}>
                  <span className={styles.dots}>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                    <span className={styles.dot}></span>
                  </span>
                </span>
              : <div>
                  <span className={styles.font}>${this.state.room.room_rate}</span> 
                  <span> per night</span>
                </div>
              }
          </div>
          <div className={styles.component}>
            <Stars room={this.state.room} />
          </div >
          <div className={styles.border} />
          <Form room={this.state.room} />
          <div id="finding" className={styles.component}>
            <span className={styles.info}>You won't be charged yet</span>
            <Finding scrolled={this.state.scrolled} room={this.state.room} />
          </div>
        </div>
      </ApolloProvider>

    );
  }
}

// export default Booking;
export default Booking;
