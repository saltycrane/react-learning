import React, { Component } from "react";

import cs from "./commonStyle";


export default class Contact extends Component {
    render() {
        const { name, title, phone, imageUrl } = this.props;
        // tell webpack to load the image
        const wpImageUrl = require(`./image/${imageUrl}`);

        return (
            <div style={styles.base}>
                <div style={styles.top}>
                    <div style={styles.left}>
                        <span style={{...styles.image, backgroundImage: `url(${wpImageUrl})`}}></span>
                    </div>
                    <ul style={styles.list}>
                        <li style={{...styles.item, ...styles.name}}>{name}</li>
                        <li style={styles.item}>{title}</li>
                        <li style={{...styles.item, ...styles.phone}}>
                            <i className="fa fa-phone" style={styles.iconPhone}></i>
                            <span>{phone}</span>
                        </li>
                    </ul>
                    <div style={styles.right}>
                        <span style={styles.formExpand} className="pull-right">
                            <i style={styles.formExpand.iconAngleDown} className="icon icon-angle-down"></i>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    base: {
        minHeight: cs.listPanelHeight,
        position: "relative",
    },
    top: {
        display: "table"
    },
    left: {
        display: "table-cell",
        padding: "20px 0",
        verticalAlign: "top"
    },
    image: {
        ...cs.contactImage,
        display: "inline-block",
        marginLeft: "10px",
        backgroundImage: "url(tracer_bullet.jpg)"
    },
    list: {
        ...cs.listReset,
        display: "table-cell",
        height: cs.listPanelHeight,
        padding: "20px 10px",
        verticalAlign: "middle",
        width: "1000px"
    },
    item: {
        fontSize: cs.fontSizeSmall,
        lineHeight: 1.2
    },
    name: {
        fontSize: cs.fontSizeMedium,
        fontWeight: cs.fontWeightBold
    },
    phone: {
        padding: "10px 0"
    },
    iconPhone: {
        color: cs.gray5,
        display: "inline-block",
        marginRight: "8px",
        verticalAlign: "middle"
    },
    right: {
        display: "table-cell",
        height: "100%",
        verticalAlign: "middle"
    },
    bottom: {
        display: "block"
    },
    formExpand: {
        ...cs.circleClose,
        margin: "0 10px 0 0",
        iconAngleDown: {
            ...cs.circleClose.iconAngleDown,
            fontSize: "28px",
            fontWeight: 100,
            color: cs.blue
        }
    }
};
