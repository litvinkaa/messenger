import React, { useContext, useEffect } from 'react' 
import {Routes, Route, Navigate} from 'react-router-dom'

import {observer} from "mobx-react-lite";
import Auth from '../pages/Auth';
import { publicRoutes, authRoutes } from '../routes'

import {Context} from "../index"
import MainPage from '../pages/MainPage';

import {LOGIN_ROUTE, MAIN_PAGE_ROUTE, } from "../utils/consts"






const AppRouter = observer(() => {

const {user} = useContext(Context)

if(user.isAuth)
{
    return (
       <Routes> 
       
        {authRoutes.map(({path, Component})=>
        <Route key={path} path={path} element = {<Component/>} exact/>)}

        <Route path = "*" element={<Navigate to={MAIN_PAGE_ROUTE} replace={true} />}></Route>
        
        </Routes>   
        ); 
}

return (
    <Routes> 
     
    {publicRoutes.map(({path, Component})=>
    <Route key={path} path={path} element = {<Component/>} exact/>)}

    
    

    <Route path = "*" element={<Navigate to={LOGIN_ROUTE} replace={true} />}></Route>
    
    
    </Routes>
    ); 
});
export default AppRouter;