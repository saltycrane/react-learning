import React, { Component } from "react";

import Contact from "./Contact";


const CONTACTS_DATA = [
    {
        name: "Tracer Bullet",
        title: "Private Eye",
        phone: "(800) 473-3968",
        imageUrl: "tracer_bullet.jpg"
    },
    {
        name: "Miss Wormwood",
        title: "Schoolteacher",
        phone: "(738) 473-6368",
        imageUrl: "Miss_Wormwood.png"
    },
    {
        name: "Rosalyn",
        title: "Babysitter",
        phone: "(245) 667-3729",
        imageUrl: "rosalyn.png"
    }
];

export default class ContactList extends Component {
    render() {
        return (
            <section className="box">
                <ul className="contact-list list-reset">
                    {CONTACTS_DATA.map((data, index) => (
                        <li key={index}>
                            <Contact {...data} />
                        </li>
                     ))}
                </ul>
            </section>
        );
    }
}
