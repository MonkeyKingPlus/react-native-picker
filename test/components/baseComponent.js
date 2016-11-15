import React, { Component } from 'react';

export default class BaseComponent extends Component {
    _goto(path) {
        this.props.navigator.push(this.props.routes.find((r)=>r.title === path))
    }
}