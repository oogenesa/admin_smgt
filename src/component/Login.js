import React, { Component } from 'react'
import { Grid, Form, Header, Message } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom';
import store from 'store';
import isLoggedIn from '../helpers/is_login_in';
export default class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: '',
          error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount(){
        console.log('didmount')
        store.set('loggedIn', false);
    }
    onSubmit(e) {
        console.log('test')
        e.preventDefault();
        
        const { username, password } = this.state;
        const { history } = this.props;
    
        this.setState({ error: false });
    
        if (!(username === 'test' && password === 'test')) {
          return this.setState({ error: true });
        }
         store.set('loggedIn', true);
         history.push('/');
      }
      handleChange(e, { name, value }) {
        this.setState({ [name]: value });
      }    
    render() {
        const { error } = this.state;

    if (isLoggedIn()) {
      return <Redirect to="/users" />;
    }
        return (
            <Grid>
        <Helmet>
          <title>CMS | Login</title>
        </Helmet>

        <Grid.Column width={6} />
        <Grid.Column width={4}>
          <Form error={error} onSubmit={this.onSubmit} >
            <Header as="h1">Login</Header>
            {error && <Message
              error={error}
              content="That username/password is incorrect. Try again!"
            />}
            <Form.Input
              inline
              label="Username"
              name="username"
              onChange={this.handleChange}
            />
            <Form.Input
              inline
              label="Password"
              type="password"
              name="password"
              onChange={this.handleChange}
            />
            <Form.Button type="submit">Go!</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
        )
    }
    
}
