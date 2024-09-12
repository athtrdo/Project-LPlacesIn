const ExpressError = require('./ErrorHandler');
const baseUrl = 'https://geocode.search.hereapi.com/v1'
const apiKey = 'Mr-eun6v4VdGiMEAdECLo-_SwVeNCi-bNhgiQ--_iIE'


const geocode = async (address) =>{
    const url = `${baseUrl}/geocode?q=${address}&limit=1&apiKey=${apiKey}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data.items[0]
    } catch (error) {
        throw new ExpressError(error.message, 500)
    }
}

const geoJSON = async (address) => {
    try {
        const {position} = await geocode(address);
        return {
            type: 'Point',
            coordinates: [position.lat,position.lng]
        }
    } catch (error) {
        throw new ExpressError(error.message, 500)
    }
}

module.exports = {
    geocode,
    geoJSON
}
