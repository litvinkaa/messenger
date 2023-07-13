import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { useNavigate } from "react-router-dom";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate();
    
    const isLogin = (location.pathname === LOGIN_ROUTE)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const[error_msg, setErrorMsg] = useState('')

    const click = async () => {
        try {
            setErrorMsg('')
            let data;
            if(!/^[a-zA-Z0-9а-яА-Я_]*$/.test(username))
            {
                setErrorMsg("Username can only contain letters, numbers, _")
            
                return
            }
            if(username.length > 15)
            {
                setErrorMsg("Username is too long")
                
                return
            }
            if(password.length < 5)
            {
                setErrorMsg("Password is too short")
                
                return
            }
            if (isLogin) {
                data = await login(username, password);
            } else {
                data = await registration(username, password);
            }
            user.setUser(data)
            user.setIsAuth(true)
            
            navigate(MAIN_PAGE_ROUTE, {replace: true})
           
        } catch (e) {
            setErrorMsg(e.response.data.message)
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Authorization' : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter username..."
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                No account? <NavLink to={REGISTRATION_ROUTE}>Sign up!</NavLink>
                            </div>
                            :
                            <div>
                                Already have an account? <NavLink to={LOGIN_ROUTE}>Log in!</NavLink>
                            </div>
                        }
                        <Button
                            disabled={(username === '')||(password === '')}
                            className="mt-3"
                            variant={"secondary"}
                            onClick={click}
                        >
                            {isLogin ? 'Log in' : 'Sign up'}
                        </Button>
                        <div className="mt-3"
                        style={{ width:350, color:"red"}}>
                            <b>
                                
                               <Row>{error_msg}</Row>
                                </b>
                                </div>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;