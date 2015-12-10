const variables = {
    listPanelHeight: "90px",
    white: "#ffffff",
    gray4: "#cccccc",
    gray5: "#b4b4b4",
    gray6: "#999999",
    blue: "#4199D3",
    fontSizeSmall: "12px",
    fontSizeMedium: "14px",
    fontWeightBold: "700"
};
const common = {
    listReset: {
        listStyle: "none",
        margin: 0,
        padding: 0
    },
    contactImage: {
        backgroundSize: "cover",
        backgroundPosition: "center",
        border: "2px solid " + variables.gray5,
        borderRadius: "50%",
        height: "45px",
        position: "relative",
        width: "45px"
    },
    circleClose: {
        backgroundColor: variables.white,
        border: "1px solid " + variables.gray6,
        borderRadius: "50%",
        color: variables.gray8,
        cursor: "pointer",
        height: "36px",
        textAlign: "center",
        width: "36px",
        iconClose: {
            position: "relative",
            top: "9px"
        },
        iconAngleDown: {
            position: "relative",
            top: "11px"
        }
    }
};
export default {
    ...variables,
    ...common
};
