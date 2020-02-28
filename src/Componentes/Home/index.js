import React, {Component} from 'react';
import axios from 'axios';
import { 
    Navbar, 
    Input, 
    Button, 
    InputGroup,
    InputGroupAddon, 
    Container, 
    Col, Row,
    Form,
    Card,CardBody,CardText, CardTitle,CardSubtitle,
    Spinner
} from 'reactstrap';

import { MdSearch,MdRemoveFromQueue,MdStar } from 'react-icons/md';
import logo from './img/whatsapp.png'

export default class Home extends Component {
    state = {
        loading: false,
        stars:[]
    }

    imagem =() => {
        return <img src={logo} alt="logo"/>
    }

    universe = async (event) => {
        event.preventDefault()

        this.setState({carregando: true})
        const texto = event.target.children[0].children[0];
        
        const stars = await axios(`https://api.nasa.gov/planetary/apod?date=${texto.value}&api_key=a9E2p0JXJ6XZAJQOJ7q6dFM1sD22JP3ziq1LeO1R`)
        //const stars = await axios(`https://api.github.com/users/${texto.value}/followers`) 
        // const { stars: data } = await axios(`https://api.github.com/users/${texto.value}/followers`)

        this.setState ({stars: [stars.data, ...this.state.stars], carregando: false})
}

    resetar = () => {
        this.setState({stars:[] })
    }



    render() {
        return(
            <>
            <Navbar color="dark" fixed="bottom">
                <Container className="d-flex flex-row justify-content-center">
                    <Col xs="12" md="6">
                        <Form onSubmit={this.universe}>
                        <InputGroup>
                        <Input type="date" className="texto"/>
                            <InputGroupAddon addonType="append">
                                <Button color="light" outline>
                                    {this.state.carregando ? (<Spinner size="sm" color="danger"/>) :<MdSearch size="20"/>}
                                </Button>
                                <Button className="" color="light" outline onClick={this.resetar}><MdRemoveFromQueue size="20"/></Button>
                            </InputGroupAddon>
                        </InputGroup>
                        </Form>
                    </Col>
                </Container>
            </Navbar>

            { this.state.carregando ? (
            <Container className="h-100 d-flex flex-column justify-content-center align-items-center"> 
                <Spinner color="dark" size="lg"/>
                <span>Loading ...</span>
            </Container>
        ) : (
            <Container className="mt-3 mb-7">
            <Row>
        { this.state.stars.map((stars)=> (
            <Col className="d-flex" xs="12" md="4">
            <Card className="text-light mt-3" color="dark">
            <img className="p-2" width="100%" height="40%" src={stars.url} alt="Meteoro" />
            <CardBody>
                <CardTitle className="h3 text-center">{stars.title}</CardTitle>
                <CardSubtitle className="text-muted text-center">{stars.date.split('-').reverse().join('/')}</CardSubtitle>
                <CardText className="text-justify">{stars.explanation}</CardText>
            </CardBody>
        </Card></Col>
        ))}
        </Row>
        </Container>
            )}

            {this.state.stars.length === 0 && (
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center"> 
                    (this.imagem)
                    <h3>Escolha uma data !</h3>
                </Container>
            )}


            {/* { this.state.carregando && (
            <Container className="h-100 d-flex flex-column justify-content-center align-items-center"> 
                <Spinner color="dark" size="lg"/>
                <span>Loading ...</span>
            </Container>)} */}

{/* <MdStar color="dark" size="150px"/> */}

            </>
        ) ;
    }
}
