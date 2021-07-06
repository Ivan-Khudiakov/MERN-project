import React from "react"
import {Switch, Route} from 'react-router-dom'
import {AuthPage} from "./components/AuthPage/AuthPage"
import {Contacts} from "./components/Contacts/Contacts"
import {Favorites} from "./components/Contacts/Favorites/Favorites"

export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Switch>
                <Route path='/contacts' exact render={() => <Contacts/>}/>
                <Route path='/favorites' render={() => <Favorites/>}/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' render={() => <AuthPage/>}/>
        </Switch>
    )
}