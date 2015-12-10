import React, { Component } from "react";


export default class Contact extends Component {
    render() {
        const { name, title, phone, imageUrl } = this.props;
        // tell webpack to load the image
        const wpImageUrl = require(`./image/${imageUrl}`);

        return (
            <div className="contact">
                <div className="contact-top">
                    <div className="contact-left">
                        <span
                            className="contact-image"
                            style={{'backgroundImage': `url(${wpImageUrl})`}}></span>
                    </div>
                    <ul className="list-reset contact-ul">
                        <li className="contact-item contact-name">{name}</li>
                        <li className="contact-item">{title}</li>
                        <li className="contact-item phone">
                            <i className="fa fa-phone"></i>
                            <span>{phone}</span>
                        </li>
                    </ul>
                    <div className="contact-right">
                        <span className="form-expand pull-right">
                            <i className="icon icon-angle-down"></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
