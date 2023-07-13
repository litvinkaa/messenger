import React, {useContext, useState, useEffect} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Row, Col} from "react-bootstrap";
import {NavLink, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_PAGE_ROUTE} from "../utils/consts";
import {login, registration, check, get, updateUser, searchUser} from "../http/userAPI";
import {getChat,getMessages, updateChat, createChat} from "../http/chatAPI";
import {getMessage,sendMessage,updateMessage} from "../http/messageAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { LOCAL_STORAGE_AUTH_KEY } from "../utils/consts";

function format_date(date_input)
{
    date_input = new Date(date_input)
    if((typeof date_input === 'undefined') ||(isNaN(date_input)))
    {
        
        return ''
    }

    let month = date_input.getMonth()+1
    if(month<10)
    {
        month = "0" + month
    }

    let day = date_input.getDate()
    if(day<10)
    {
        day = "0" + day
    }

    let hour = date_input.getHours()
    if(hour<10)
    {
        hour = "0" + hour
    }

    let minute = date_input.getMinutes()
    if(minute<10)
    {
        minute = "0" + minute
    }
    let date = date_input.getFullYear()+'-'+month+'-'+day;
    let time = hour + ":" + minute;
    let dateTime = date + ', ' + time;
    return dateTime;
}

async function chats_set(user_resp)
{
    let temp = []
    for(let chat_id of user_resp.active_chats)
    {
        let chat = await getChat(chat_id)
        let second_user_id = user_resp.id !== chat.user1_id ? chat.user1_id : chat.user2_id
        let second_user = await get(second_user_id)
        chat.name = second_user.username
        chat.second_user_id = second_user_id
        temp.push(chat)
        
    }
    return temp
    
}
let connection = {}

const MainPage = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    
    const isLogin = (location.pathname === LOGIN_ROUTE)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const[error_msg, setErrorMsg] = useState('')
    const[cur_user, setCurrentUser] = useState({})
    const[active_chats, setActiveChats] = useState([])
    const[chat_messages, setChatMessages] = useState([])
    const[current_chat, setCurrentChat] = useState({})
    const[chat_user, setChatUser] = useState({})
    const[edited_message, setEditedMessage] = useState({})
    const[message, setMessage] = useState('')
    const[new_ava_url, setNewAvaUrl] = useState('')
    const[cur_ava_url, setCurAvaUrl] = useState('')
    const[chat_ava_url, setChatAvaUrl] = useState('')
    const[is_user_blocked, setIsBlocked] = useState(false)
    const[are_you_blocked, setYouBlocked] = useState(false)
    const[is_edit, setIsEdit] = useState(false)
    const[searched_string, setSearchedString] = useState('')
    const[found_users, setFoundUsers] = useState([])
    const[is_search, setIsSearch] = useState(false)

    function check_chat()
    {
        
        return cur_user.active_chats.includes(current_chat.id)
         
            
        
    }

    const chat_clicked = async (chat) => {
        try {
            setErrorMsg('')
            setMessage('')
            setIsBlocked(false)
            setYouBlocked(false)
            
            setCurrentChat(chat)

            const messages_resp = await getMessages(chat.id)
            setChatMessages(messages_resp)

            let user_resp = await get(chat.second_user_id)
            setChatUser(user_resp)
            setChatAvaUrl(user_resp.ava_url)
            if(cur_user.blocked_users.includes(user_resp.id))
            {
                setIsBlocked(true)
            }
            
            if(user_resp.blocked_users.includes(cur_user.id))
            {
                setYouBlocked(true)
            }

            connection.addEventListener('message', async (message) => {
    
                const res_object = JSON.parse(message.data)
                const command = res_object[0]
                
                switch(command){
                    

                    case "user changed":
                        
                        const chat_id = res_object[1]
                        if(current_chat.id == chat_id)
                        {

                            user_resp = await get(chat.second_user_id)
                            setYouBlocked(user_resp.blocked_users.includes(cur_user.id))
                            setChatUser(user_resp)
                            setChatAvaUrl(user_resp.ava_url)

                           

                            // await chat_clicked(chat)
                        }
                       
                    
                        
                        break
                
               
                }
                
            
                
            });
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }
        
    }

    const user_clicked = async (user) => {
        try {
            user = await get(user.id)
            setErrorMsg('')
            if(!check_chat)
            {
                setCurrentChat({})
                setChatUser({})
                
            }
            for(let chat of active_chats)
            {
                if(chat.second_user_id === user.id)
                {
                    await chat_clicked(chat)
                    return
                }
            }
            
            
            const chat_resp = await createChat(cur_user.id,user.id)
            
             
            
            if(chat_resp.is_active)
            {
                const changed_user1 = cur_user
                changed_user1.active_chats.push(chat_resp.id)
                
                const changed_user2 = user
                changed_user2.active_chats.push(chat_resp.id)

                const user1_resp = await updateUser(changed_user1)
                const user2_resp = await updateUser(changed_user2)
                setChatUser(changed_user2)
                
                connection.send(JSON.stringify(["chat created",chat_resp.id]))

            }

            
           
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }
    const send_message = async () => {
        try {
            setErrorMsg('')
            let msg = {}
            msg.text = message
            msg.chat_id = current_chat.id
            msg.sender_id = cur_user.id
            
            const send_resp = await sendMessage(msg)
            connection.send(JSON.stringify(["message sent",send_resp.chat_id]))
            setMessage("")
            
            
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }

    const delete_chat = async () => {
        try {
            setErrorMsg('')
            const changed_user = cur_user
            const changed_user2 = chat_user
            const changed_сhat = current_chat

            changed_сhat.is_active = false
            for( let i = 0; i < changed_user.active_chats.length; i++){ 
    
                if (changed_user.active_chats[i] === changed_сhat.id) { 
            
                    changed_user.active_chats.splice(i, 1); 
                    break
                }
            
            }

            for( let i = 0; i < changed_user2.active_chats.length; i++){ 
                
                if (changed_user2.active_chats[i] === changed_сhat.id) { 
            
                    changed_user2.active_chats.splice(i, 1); 
                    break
                }
            
            }
            
            
            const user_resp = await updateUser(changed_user)
            const user_resp2 = await updateUser(changed_user2)
            const chat_resp = await updateChat(changed_сhat)
            setChatUser(changed_user2)
            connection.send(JSON.stringify(["chat deleted",changed_сhat.id]))

            
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }

    
    const change_ava = async () => {
        try {
            setErrorMsg('')
            const changed_user = cur_user
            

            changed_user.ava_url = new_ava_url
            
            const user_resp = await updateUser(changed_user)
            
            if(user_resp[0] === 1)
            {
                
                setCurrentUser(changed_user)
                setCurAvaUrl(new_ava_url)
                connection.send(JSON.stringify(["user changed", current_chat.id]))
                
            }
            

           
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }
    const change_message = async (id, msg) => {
        try {
            setErrorMsg('')
            const changed_message = msg
            if(id === "edit_btn"){
                setIsEdit(true)
                setMessage(msg.text)
                setEditedMessage(msg)
                
                return
            }
            else if(id === "delete_btn"){
                changed_message.is_deleted = true
            }
            else if(id === "confirm_btn"){
                changed_message.is_edited = true
                changed_message.text = message

                setIsEdit(false)
                setEditedMessage({})
                setMessage("")
            }
            else if(id === "cancel_btn"){
                setIsEdit(false)
                setEditedMessage({})
                setMessage("")
                return
            }
            
            const resp = await updateMessage(changed_message)
            
            if(resp[0] === 1)
            {
                connection.send(JSON.stringify(["message sent",changed_message.chat_id]))
            }
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }

    const block_clicked = async () => {
        try {
            setErrorMsg('')
            const changed_user = cur_user
            if(is_user_blocked){
                for( let i = 0; i < changed_user.blocked_users.length; i++){ 
    
                    if (changed_user.blocked_users[i] === chat_user.id) { 
                
                        changed_user.blocked_users.splice(i, 1); 
                        break
                    }
                
                }
            }
            else{
                changed_user.blocked_users.push(chat_user.id)
            }
            

            const resp = await updateUser(changed_user)
            if(resp[0] === 1){
                setCurrentUser(changed_user)
                setIsBlocked(!is_user_blocked)
            }
            
            connection.send(JSON.stringify(["user changed", current_chat.id]))
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }

    const search = async () => {
        try {
            setErrorMsg('')
            if(!/^[a-zA-Z0-9а-яА-Я_]*$/.test(searched_string))
            {
                setErrorMsg("Username can only contain letters, numbers, _")
                setIsSearch(false)
                return
            }
            if(searched_string.length > 15)
            {
                setErrorMsg("Username is too long")
                setIsSearch(false)
                return
            }
            const resp = await searchUser(searched_string)

            for( let i = 0; i < resp.length; i++){ 
    
                if (resp[i].id === cur_user.id) { 
            
                    resp.splice(i, 1); 
                    break
                }
            
            }
            setFoundUsers(resp)
            setIsSearch(true)
            
           
            
        } catch (e) {
            // setErrorMsg(e.response.data.message)
            console.log("error: ", e)
        }

    }
    useEffect(async()=>{
        try
        {  
            const responce = await check();
            if(responce.message === "Not authorised")
            {
                
                localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
                user.setIsAuth(false)
            }
            
            const user_resp = await get(user.user.id);
            if((user_resp.message === "Not authorised")||(user_resp.message === "Not found"))
            {
                
                localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
                user.setIsAuth(false)
            }
            else
            {
                setCurrentUser(user_resp)
                setCurAvaUrl(user_resp.ava_url)
                
                setActiveChats(await chats_set(user_resp))
                setErrorMsg('')

                const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
                const wsLocation = `${protocol}//${process.env.REACT_APP_WS_SERVER_URL}`;
                connection = new WebSocket(wsLocation)
                

                
                connection.addEventListener('open', () => connection.send(JSON.stringify(["connect",user_resp.id])));

                connection.addEventListener('message', async (message) => {
    
                    const res_object = JSON.parse(message.data)
                    const command = res_object[0]
                    let changed_user = {}
                    switch(command){
                        case "chat created":
                            changed_user = await get(user_resp.id)
                            setCurrentUser(changed_user)
            
                            setActiveChats(await chats_set(changed_user))
                            
                            break

                        case "chat deleted":
                            changed_user = await get(user_resp.id)
                            setCurrentUser(changed_user)
                            setActiveChats(await chats_set(changed_user))
                           
                            
                            break

                        case "user changed":
                            changed_user = await get(user_resp.id)
                            setCurrentUser(changed_user)
                            setActiveChats(await chats_set(changed_user))
                        
                            
                            break
                    
                        case "message sent":
                            
                            const chat_id =  res_object[1]
                            const messages_resp = await getMessages(chat_id)
                            setChatMessages(messages_resp)
                            
                        
                            
                            break
                    }
                    
                
                    
                });
            }
           
        }
        catch(err)
        {
            localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY)
            user.setIsAuth(false)

        }

    },[])

    return (
        <Container >
            
            <Row>
                <Col>
                    <Row><h4>Welcome, {cur_user.username}</h4></Row>
                    {(cur_user.ava_url !== "")&&<span><img src = {cur_ava_url} alt="profile_picture" className="img-thumbnail mb-2" width={"200pc"} height={"2000pc"}></img> <br></br></span>}
                    <input type="text"  className="form-control" id="NewMessage" placeholder="New profile picture link (empty for no picture)"  value ={new_ava_url} onChange={e => setNewAvaUrl(e.target.value)}></input>
                    <Button  onClick={change_ava}  className="mt-1" variant={"primary"}> Change picture</Button>
                    <Row className="d-flex mt-2" ><h5>Search users</h5></Row>
                    <div className="form-group">
                    
                    <input type="text"  className="form-control"    placeholder="Enter username"  value ={searched_string} onChange={e => setSearchedString(e.target.value)}></input>
                    <button   className="btn btn-primary mt-1" onClick={search} disabled={(searched_string === "")}>Search</button></div>
                    <div className="mt-3"
                        style={{ width:350, color:"red"}}>
                            <b>
                                
                                {error_msg}
                                </b>
                                </div>
                    
                    { found_users.length === 0 && is_search ?
                    <h5 className="mt-2">No users found</h5>:
                    <div className="list-group scrollit mt-2"> 
                   
                    {is_search && <h5>Found users</h5>}
                    
                    {found_users.map(user=>
                        <div key ={user.id}> 
                        {user.id === chat_user.id && check_chat()
                        ?
                        <button type="button" style={{ backgroundColor:"#008CBA", color:"white"}} className="list-group-item list-group-item-action"><b>{user.username}</b>  </button>
                        :
                        <button type="button"  className="list-group-item list-group-item-action" onClick={(u)=> user_clicked(user)}><b>{user.username}</b> </button>}
                        </div>
                    
                        )}
                    
                    </div>}
                </Col>
                <Col>
                { found_users.length === 0 && is_search ?
                    <h5 className="mt-2">No users found</h5>:
                    <div className="list-group scrollit mt-2"> 
                   
                    {is_search && <h5>Found users</h5>}
                    
                    {found_users.map(user=>
                        <div key ={user.id}> 
                        {user.id === chat_user.id && check_chat()
                        ?
                        <button type="button" style={{ backgroundColor:"#008CBA", color:"white"}} className="list-group-item list-group-item-action"><b>{user.username}</b>  </button>
                        :
                        <button type="button"  className="list-group-item list-group-item-action" onClick={(u)=> user_clicked(user)}><b>{user.username}</b> </button>}
                        </div>
                    
                        )}
                    
                    </div>}
                </Col>
          
                
                <Col> 
                <div className="list-group scrollit"> 
                    <h5>Your chats</h5>
                    
                    {active_chats.map(chat=>
                        <div key ={chat.id}> 
                        {chat.id === current_chat.id 
                        ?
                        <button type="button" style={{ backgroundColor:"#008CBA", color:"white"}} className="list-group-item list-group-item-action"><b>{chat.name}</b>  </button>
                        :
                        <button type="button"  className="list-group-item list-group-item-action" onClick={(c)=> chat_clicked(chat)}><b>{chat.name}</b> </button>}
                        </div>
                    
                        )}
                    
                    </div>


                
    </Col>
                <Col>
                    {chat_user.username && check_chat()
                    ?<div>
                    <h5>Chat with {chat_user.username} {is_user_blocked && <b> (blocked)</b>} {are_you_blocked && !is_user_blocked && <b> (you have been blocked)</b>}</h5>
                    {(chat_user.ava_url !== "")&&<span><img src = {chat_ava_url} alt="profile_picture" className="img-thumbnail mb-2" width={"200pc"} height={"2000pc"}></img> <br></br></span>}
                    <Button
                            className="mb-3"
                            variant={"dark"}
                            onClick={block_clicked}
                        >
                            {is_user_blocked ? 'Unblock' : 'Block'}
                        </Button>

                    <Button
                        className="mb-3 ms-2"
                        variant={"dark"}
                        onClick={delete_chat}
                    >
                        Delete chat
                    </Button>
                    {chat_messages.map(msg=><div  className="">
                         <ul className="list-group scrollit" key ={msg.id}> 
                         {msg.sender_id === cur_user.id
                         ?<div>
                        
                         <li className="list-group-item">
                        {format_date(msg.createdAt)}{msg.is_edited && !msg.is_deleted && <em> edited</em>} {msg.is_deleted && <em> deleted</em>}</li>{!msg.is_deleted &&<li className="list-group-item" style={{ backgroundColor:"#008CBA", color:"white"}}> {msg.text}</li>}{!msg.is_deleted && <div><Button id="edit_btn" className="mt-1" onClick={e => change_message(e.target.id,msg)} variant={"primary"}> Edit</Button><Button  onClick={e => change_message(e.target.id,msg)} id="delete_btn" className="mt-1 ms-2" variant={"primary"}> Delete</Button></div>}<br></br></div>
                         :<div>
                         <li className="list-group-item"> {format_date(msg.createdAt)} {msg.is_edited && !msg.is_deleted && <em> edited</em>} {msg.is_deleted && <em> deleted</em>}</li>{<li className="list-group-item"> {!msg.is_deleted && msg.text}</li>}<br></br></div>
                         }
                         
                     </ul></div>
                    )}
                     
            <div className="form-group">
                <input type="text"  className="form-control" id="NewMessage" placeholder="New message"  value ={message} onChange={e => setMessage(e.target.value)}></input>
                <button  id="Send" className="btn btn-primary mt-1" onClick={send_message} disabled={(message === "")||(is_user_blocked)||(are_you_blocked)||(is_edit)}>Send</button>
                {is_edit && <span><Button id="confirm_btn" className="mt-1 ms-2" onClick={e => change_message(e.target.id, edited_message)} variant={"primary"} disabled={(message === "")|| (message === edited_message.text)}> Confirm</Button><Button  onClick={e => change_message(e.target.id, edited_message)} id="cancel_btn"  className="mt-1 ms-2" variant={"primary"}> Cancel</Button></span>}

                </div>
      
                   </div>
                    :<div></div>


                    }
                </Col>

            </Row>
            
        </Container>
    );
});

export default MainPage;