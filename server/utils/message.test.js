// test for the message util function
const {generateMessage} = require('./message');
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