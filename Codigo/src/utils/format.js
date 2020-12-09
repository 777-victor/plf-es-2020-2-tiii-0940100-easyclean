const weekdays = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
]

function convertHoursToMinutes(time) {
    const [hour, minutes] = time.split(":")
    return Number((hour * 60) + minutes)
}


function convertMinutesToHours(value, index) {
    console.log("Valor chegando: " + value);
    const valor = String(value).substring(0, index) + "," + String(value).substring(index);
    return valor;
}

module.exports = {
    weekdays,
    convertHoursToMinutes,
    convertMinutesToHours
}