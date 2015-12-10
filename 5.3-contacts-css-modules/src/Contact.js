import commonStyles from "./common.scss";
import styles from "./Contact.scss";

import React, { Component } from "react";


export default class Contact extends Component {
    render() {
        const { name, title, phone, imageUrl } = this.props;
        // tell webpack to load the image
        const wpImageUrl = require(`./image/${imageUrl}`);

        // I am using global CSS classes from Font Awesome and Bootstrap.
        // I tried using `composes` from CSS Modules but it made my
        // file size larger than expected. I was probably doing something
        // wrong. Example:
        //     .phoneIcon {
        //         composes: fa fa-phone from "../node_modules/font-awesome/css/font-awesome.css";
        //     }
        return (
            <div className={styles.root}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <span
                            className={styles.image}
                            style={{'backgroundImage': `url(${wpImageUrl})`}}></span>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.nameItem}>{name}</li>
                        <li className={styles.item}>{title}</li>
                        <li className={styles.phoneItem}>
                            <i className={styles.phoneIcon + " " + "fa fa-phone"}></i>
                            <span>{phone}</span>
                        </li>
                    </ul>
                    <div className={styles.right}>
                        <span className={commonStyles.formExpand + " " + "pull-right"}>
                            <i className={commonStyles.icon + " " + commonStyles.iconAngleDown}></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
