let generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt : new Date().getTime()
    }
}

let generateLocationMessage = (from,long,lat) =>{
    return {
        from,
        url : `https://www.google.com/maps?q=${long},${lat}`,
        createdAt : new Date().getTime()

    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}