import React, {Component} from "react";
import { Notifs } from 'redux-notifications';
import store from '../store';
import Header from "./Header";
import MainContent from "./MainContent";

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <Notifs store={store}/>
                <Header />
                <MainContent />
            </div>
        );
    }
}