module.exports = async prefix => {
    let caracters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"];
    let id = [];
    for(let i = 0; i < 10; i++) id.push(caracters[Math.floor(Math.random() * caracters.length)])

    return `${prefix}-${id.join("")}`;
}