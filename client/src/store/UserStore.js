import {LOCAL_STORAGE_AUTH_KEY } from "../utils/consts"

import jwt_decode from "jwt-decode";

import {makeAutoObservable} from 'mobx'
export default class UserStore{
    constructor(){
        
        const data = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
        
        this._isAuth = data ? true : false 
        this._user = data ? jwt_decode(data) : {} 
        makeAutoObservable(this)

    }
    setIsAuth(bool)
    {
        this._isAuth = bool;

    }
    setUser(user)
    {
        this._user = user;

    }
    
    get isAuth()
    {
        return this._isAuth;

    }
    get user()
    {
        return this._user;

    }
   
    
   
    
    
}