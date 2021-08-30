import React, { useState } from 'react';
import  { observer } from 'mobx-react-lite';
import { Modal, Button } from 'react-bootstrap';
import canvasState from '../store/canvasState';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import { Link } from 'react-router-dom'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';

const defaultInputStyle = {
    outline:'none',
    borderRadius:'5px',
    backgroundColor:'rgba(129, 217, 255, 0.14)',
    border:'1px solid lightgrey',
    padding:'5px 10px'
}

const errorInputStyle = {
    outline:'none',
    borderRadius:'5px',
    backgroundColor:'rgb(255 129 129 / 14%)',
    border:'1px solid red',
    padding:'5px 10px'
}

const linkClickHandler = (e)=> {
    e.preventDefault()
    navigator.clipboard.writeText(e.target.baseURI)
}

export const LoginModal = observer(() => {
    const [username, setUserName] = useState('');
    const [show, setShow] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [inputStyle, setInputStyle] = useState(defaultInputStyle)

    const getListUniqueId = (list) => {
        console.log([...new Set(list.map(item => JSON.stringify(item.id)))].map(item => JSON.parse(item)))
        let unique = list && [...new Set(list.map(item => JSON.stringify(item.id)))].map(item => JSON.parse(item))
        
        return unique 
    }
    

    const connectionHandler = (e) => {
        if(!username){
            setError('имя обязательно')
            setShow(true)
            setInputStyle(errorInputStyle)
        } else {
            canvasState.setUsername(username)
            setShow(false)
        }
        
    }

    return (
        <Modal show={show} onHide={() => {}}>
            <Modal.Header >
                <Modal.Title>Выбор имени и комнаты</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div>
                        <input type="text" id="username" placeholder={error ? error :"ваше имя"} style={inputStyle} 
                        onChange={(e)=> {
                            setUserName(e.target.value)
                            setInputStyle(defaultInputStyle)
                        }}/>
                    </div>
                    
                    <div style={{
                        color:'darkgray',
                        borderRadius:'5px',
                        margin: '20px 0 0 0',
                        backgroundColor: '#81d9ff24',
                        padding: '10px'
                        }}>
                        <p> выберите комнату или создайте свою пропустив этот шаг:</p>
                        <ul>   
                        {   
                            canvasState.clientsList.length && canvasState.clientsList.length === 1 ? 
                            <li>В данный момент свободных комнат нет</li> :
                            canvasState.clientsList && getListUniqueId(canvasState.clientsList).map(id =>{
                            if(id !== canvasState.sessionId){                 
                                return (
                                    <>
                                        <li key={`${id}`} style={{display:'flex', justifyContent:'space-between', color:'cornflowerblue'}}>
                                            <Link to={`/${id}`}>{id}</Link>
                                            
                                            <span>{canvasState.clientsList.filter((c) => c.id === id).length}  <PeopleRoundedIcon/></span>
                                        </li>
                                        <hr/>
                                    </> 
                                    )
                            }
                            return null
       
                        }
                        )}
                    </ul>  
                    </div>
                    <div style={{marginTop:'20px'}}>
                        <p>Ссылка на вашу комнату:  &nbsp;
                        <Tooltip
                            PopperProps={{
                            disablePortal: true,
                            }}
                            open={open}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="скопировано"
                        >   
                         <Link id="roomLink" to="#" onClick={(e) => {
                             linkClickHandler(e)
                             setOpen(true)
                             setTimeout(() => {
                                setOpen(false)
                             },500)
                            }}>копировать</Link>
                            </Tooltip>
                            <FileCopyIcon style = {{color:'cornflowerblue'}} fontSize='small'/>
                        </p>
                    </div> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{backgroundColor:'#3f51b5'}} onClick={(e) => connectionHandler(e)}>
                        войти
                    </Button>
                </Modal.Footer>     
        </Modal>
    ) 
})

