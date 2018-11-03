<template>
  <div class="bitcoin-price-component" :class="getThemeClass">
    <div class="bitcoin-price-container">
      <div>
        <span class="price">{{ getPrice }} <strong class="arrow" :class="getPriceClass"></strong> </span>
        <span class="pair">{{ getPair }}</span>
      </div>
      <div class="reference-price">
        <span class="price low">▼ {{ getLowPrice }} </span>
        <span class="price high">▲ {{ getHighPrice }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import http from 'axios';

export default {
  name: 'CryptoPrice',
  props: ['theme', 'provider', 'spread', 'origin', 'destiny', 'reference', 'interval'],
  computed: {
    getPrice () {
      return this.formatter.format(this.price);
    },
    getLowPrice () {
      return this.formatter.format(this.lowPrice);
    },
    getHighPrice () {
      return this.formatter.format(this.highPrice);
    },
    getThemeClass () {
      const theme = this.theme || 'dark';
      return 'theme-' + theme;
    },
    getPriceClass () {
      if (this.lastPrice === 0) {
        return '';
      }

      if (parseFloat(this.price) > parseFloat(this.lastPrice)) {
        return 'up';
      }

      if (parseFloat(this.price) <= parseFloat(this.lastPrice)) {
        return 'down';
      }

      return '';
    },
    getOrigin () {
      return this.origin || 'BTC';
    },
    getDestiny () {
      return this.destiny || 'BRL';
    },
    getPair () {
      return this.getOrigin + '/' + this.getDestiny;
    },
  },
  methods: {
    updatePrice () {
      switch (this.provider.toLowerCase()) {
        case 'bitcambio': return this.updateBitcambioPrice();
        case 'mercado-bitcoin': return this.updateMercadoBitcoinPrice();
        case 'bitcointrade': return this.updateBitcointradePrice();
        default: return this.updateOthersExchanges();
      }
    },

    async updateBitcambioPrice () {
      try {
        if (this.getOrigin !== 'BTC' && this.getDestiny !== 'BRL') {
          return false;
        }

        const lastPrice = this.price;

        const url = `https://bitcambio_api.blinktrade.com/api/v1/${this.getDestiny}/ticker?crypto_currency=${this.getOrigin}`;
        const ticker = await http.get(url, this.httpConfig);
        const ref = this.reference || 'last';
        let price = parseFloat(ticker.data[ref] || ticker.data.last);
        price = (parseFloat(this.spread || '0') + 1) * price;
        this.price = price.toFixed(2);

        let lowPrice = parseFloat(ticker.data.low);
        lowPrice = (parseFloat(this.spread || '0') + 1) * lowPrice;
        this.lowPrice = lowPrice.toFixed(2);

        let highPrice = parseFloat(ticker.data.high);
        highPrice = (parseFloat(this.spread || '0') + 1) * highPrice;
        this.highPrice = highPrice.toFixed(2);

        if (this.price !== lastPrice) {
          this.lastPrice = lastPrice;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    async updateMercadoBitcoinPrice () {
      try {
        if (this.getOrigin !== 'BTC' && this.getDestiny !== 'BRL') {
          return false;
        }

        const lastPrice = this.price;

        const url = `https://www.mercadobitcoin.net/api/${this.getOrigin}/ticker/`;
        const ticker = await http.get(url, this.httpConfig);
        const ref = this.reference || 'last';
        let price = parseFloat(ticker.data.ticker[ref] || ticker.data.ticker.last);
        price = (parseFloat(this.spread || '0') + 1) * price;
        this.price = price.toFixed(2);

        let lowPrice = parseFloat(ticker.data.ticker.low);
        lowPrice = (parseFloat(this.spread || '0') + 1) * lowPrice;
        this.lowPrice = lowPrice.toFixed(2);

        let highPrice = parseFloat(ticker.data.ticker.high);
        highPrice = (parseFloat(this.spread || '0') + 1) * highPrice;
        this.highPrice = highPrice.toFixed(2);

        if (this.price !== lastPrice) {
          this.lastPrice = lastPrice;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    async updateBitcointradePrice () {
      try {
        if (this.getOrigin !== 'BTC' && this.getDestiny !== 'BRL') {
          return false;
        }

        const lastPrice = this.price;

        const url = `https://api.bitcointrade.com.br/v1/public/${this.getOrigin}/ticker`;
        const ticker = await http.get(url, this.httpConfig);
        const ref = this.reference || 'last';
        let price = parseFloat(ticker.data.data[ref] || ticker.data.data.last);
        price = (parseFloat(this.spread || '0') + 1) * price;
        this.price = price.toFixed(2);

        let lowPrice = parseFloat(ticker.data.data.low);
        lowPrice = (parseFloat(this.spread || '0') + 1) * lowPrice;
        this.lowPrice = lowPrice.toFixed(2);

        let highPrice = parseFloat(ticker.data.data.high);
        highPrice = (parseFloat(this.spread || '0') + 1) * highPrice;
        this.highPrice = highPrice.toFixed(2);

        if (this.price !== lastPrice) {
          this.lastPrice = lastPrice;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    },

    async updateOthersExchanges () {
      console.error('Not implemented provider');
    },
  },
  data () {
    return {
      price: 0,
      highPrice: 0,
      lowPrice: 0,
      lastPrice: 0,
      pair: 'BTC/BRL',
      formatter: null,
      priceInterval: null,
      httpConfig: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    };
  },
  beforeMount () {
    const userLang = navigator.language || navigator.userLanguage;
    this.formatter = new Intl.NumberFormat(userLang, {
      style: 'currency',
      currency: this.getDestiny,
      minimumFractionDigits: 2,
    });

    this.updatePrice();
    this.priceInterval = setInterval(this.updatePrice, this.interval || 30000);
  },
  beforeDestroy () {
    clearInterval(this.priceInterval);
  },
};
</script>

<style lang="scss">
.bitcoin-price-component {
  text-align: center;
}
</style>
