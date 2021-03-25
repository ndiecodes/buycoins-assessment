const { default: axios } = require("axios");

const AllowedTypes = {
    BUY: "buy",
    SELL: "sell",
  };
  
  GET_BTC_USD_PRICE = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      return data.bpi.USD.rate_float;
    } catch (error) {
      throw error;
    }
  };

  getPurchaseRate = (btcPrice, args) => {
    let amount;
    switch (args.type) {
      case AllowedTypes.BUY:
        amount = btcPrice + (btcPrice * args.margin);
        break;
      case AllowedTypes.SELL:
        amount = btcPrice - (btcPrice * args.margin);
        break;
      default:
        break;
    }
    //convert USD to NGN
    amount = amount * args.exchangeRate;

    return amount;
  }



  module.exports = {
    AllowedTypes,
    GET_BTC_USD_PRICE,
    getPurchaseRate,
  }