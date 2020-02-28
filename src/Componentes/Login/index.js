import React, { Component } from 'react';
import { 
    Input, 
    Button, 
    Container, 
    Form,
} from 'reactstrap';


export default class Login extends Component {
    logar = (event) => {
        event.preventDefault()
    
        const trigger = event.target.children[0]
    
        this.props.history.push(`/home/${trigger.value}`)
    }



  render() {
    return (
        <>
<Container className="h-100">
        <Form className="h-100 d-flex flex-column align-items-center justify-content-center" onSubmit={this.logar}>
        <Input className="text-center mt-2" placeholder="Seu login do GitHub" required/>
        <Button className="w-100" color="dark">
            Logar
        </Button>
        </Form>
    </Container>
        </>
    );
  }
}
        // <Form>
        //     <InputGroup>
        //     <Input type='text'/>
        //     <InputGroupAddon addonType="append">
        //         <Button type="submit">Login</Button>
        //     </InputGroupAddon>
        //     </InputGroup>
        // </Form>