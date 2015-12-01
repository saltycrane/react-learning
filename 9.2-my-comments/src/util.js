import moment from "moment";


export function formatDate(isodate) {
    return moment(isodate).format("YYYY-MM-DD h:mm a");
}
