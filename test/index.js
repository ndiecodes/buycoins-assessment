const chai = require('chai')
const assert = chai.assert;

const {AllowedTypes , getPurchaseRate} = require("../services/priceService")

const MOCk_BTC_PRICE = 1000

//mock buy args
const buyArgs = {
    type: AllowedTypes.BUY,
    margin: 0.2,
    exchangeRate: 365,
}

//mock sell args
const sellArgs = {...buyArgs, type: AllowedTypes.SELL }


describe("Test Price Calculator", () => {

	it("it should return correct buy price in NGN", ()=> {
		assert.equal(438000, getPurchaseRate(MOCk_BTC_PRICE, buyArgs));
	})

    it("it should return correct sell price in NGN", ()=> {
		assert.equal(292000, getPurchaseRate(MOCk_BTC_PRICE, sellArgs));
	})
})