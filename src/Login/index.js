import React from 'react';
import axios from 'axios';
import { Grid, Form, Header, Message } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import isLoggedIn from '.././helpers/is_logged_in';
import './styles.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: '',
      error: false,
      createUser: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.state.createUser){
    this.signUp()

    }
    else {
      this.signIn()
    }

  }

  signUp = () =>{
    const { name, password, email } = this.state;
    const formData = { name, password, email}
  axios
  .post('http://localhost:4000/user/signUp', formData)
  .then(response => {
    if (response.data.success === true) {
       this.setState({ createUser: false  });
    } else {
      this.setState({ error: true  });
    }
  })
  //  this.setState({ createUser: false  });
  }

  signIn= ()=>{
    const { email, password } = this.state;
    const formData = {email, password }
  axios
  .post('http://localhost:4000/user/signIn', formData)
  .then(response => {
    if (!response.data.success) {
      this.setState({ error: true  });
      localStorage.setItem('loggedIn', false);
    } else {
      this.setState({ error: false  });
      localStorage.setItem('loggedIn', true);
      window.location.href = '/';
    }
  })
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  render() {
    const { error ,createUser} = this.state;
    console.log("createUser",createUser);
    if(createUser) {
    return (
      <div className="loginWrapper">
      <Grid>
        <Helmet>
          <title>CMS | SignUP</title>
        </Helmet>

        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form className="loginForm" error={error} onSubmit={this.onSubmit}>
            <Header as="h1">Sign Up</Header>
            {error && <Message
              error={error}
              content="Please Submit Again"
            />}
            <div className="inputBox">
            <Form.Input
              inline
              label="Name"
              name="Name"
              onChange={this.handleChange}
            />
            </div>
            <div className="inputBox">
            <Form.Input
              inline
              type="email"
              label="Email"
              name="email"
              onChange={this.handleChange}
            />
            </div>
            <div className="inputBox">
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            </div>
            <Form.Button type="submit" className="button">Sign Up</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
      </div>
    );
  } else {
    return (
      <div className="loginWrapper">
      <Grid>
        <Helmet>
          <title>CMS | Login</title>
        </Helmet>

        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form className="loginForm" error={error} onSubmit={this.onSubmit}>
            <Header as="h1">Login</Header>
            {error && <Message
              error={error}
              content="That email/password is incorrect. Try again!"
            />}
            <div className="inputBox">
            <Form.Input
              inline
              label="email"
              name="email"
              onChange={this.handleChange}
            />
            </div>
            <div className="inputBox">
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            </div>
            <Form.Button type="submit" className="button">Go!</Form.Button>
          </Form>
        </Grid.Column>
        <button className="create"   onClick={()=>{
          this.setState({createUser:true});
        }}> Create New User </button>
      </Grid>
      </div>
    );
  }
  }
}

export default Login;
