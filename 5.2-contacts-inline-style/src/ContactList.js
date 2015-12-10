import React, { Component } from "react";

import Contact from "./Contact";
import cs from "./commonStyle";


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
            <section style={styles.box}>
                <ul style={cs.listReset}>
                    {CONTACTS_DATA.map((data, index) => (
                        <li key={index} style={index !== (CONTACTS_DATA.length - 1) ? styles.item : null}>
                            <Contact {...data} />
                        </li>
                     ))}
                </ul>
            </section>
        );
    }
}

const styles = {
    box: {
        marginBottom: "20px",
        border: "1px solid " + cs.gray4
    },
    item: {
        borderBottom: "1px solid " + cs.gray4
    }
};
