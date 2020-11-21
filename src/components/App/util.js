import moment from 'moment';

export const calculateDiff = (s, e) => {
    let start = moment(s);
    let end = moment(e);
    let res = moment.duration(start.diff(end)).asHours();

    if (res < 0) {
        res = -res;
    }

    return res;
}

export const calculateDayDiff = (s, e) => {
    let start = moment(s);
    let end = moment(e);
    let res = moment.duration(start.diff(end)).asDays();

    if (res < 0) {
        res = -res;
    }

    return res;
}

export const a11yProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}