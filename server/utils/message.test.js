// test for the message util function
const {generateMessage,generateLocationMessage} = require('./message');
const {expect } = require('chai');

describe("generateMessage",() => {
    let from = "Samuel";
    let text = "Will you marry me?"
    it("should generate message object with : 'from' and 'text'",() => {
        let result = generateMessage(from,text);
        expect(result).to.be.an("object")
        expect(result).to.deep.include({
            from,
            text
        })
        expect(result.createdAt).to.be.a("number")
    })
})

describe("generateLocationMessage",() => {
    let from = "dom";
    let long = 1
    let lat = 2

    it("should return correct location object",() => {
        let result = generateLocationMessage(from,long,lat);
        expect(result).to.be.an("object");
        expect(result).to.deep.include({
            from,
            url : `https://www.google.com/maps?q=${long},${lat}`
        })
    })
})