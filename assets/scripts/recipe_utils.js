
const time = function(hours, minutes, seconds) {

    return new Date(((hours * 60 + minutes) * 60 + seconds) * 1000);
};
