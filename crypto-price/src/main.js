import Vue from 'vue';
import BitcoinPrice from './CryptoPrice.vue';
import vueCustomElement from 'vue-custom-element';

Vue.config.productionTip = false;

Vue.use(vueCustomElement);

Vue.customElement('crypto-price', BitcoinPrice, {
  shadow: true,
  shadowCss: `
  .bitcoin-price-component {
    font-family: Helvetica, Arial, Sans-Serif;
    min-width: 275px !important;
    max-width: 375px !important;
    
    margin: 0;
    padding: 0;
    box-shadow: 0 0 10px #ccc !important;
    display: inline-block;
    
  }
  
  .bitcoin-price-container {
    padding: 12px;
    border-left: red 6px solid;
    
    font-weight: 600;
  }
  
  .bitcoin-price-container .price {
    font-size: 1.6em;
  }
  
  .bitcoin-price-container .pair {
    font-size: 0.9em;
    float: right;
    margin-top: 8px;
    opacity: 0.8;
  }
  
  .bitcoin-price-container .reference-price {
    padding-top: 10px;
  }
  
  .bitcoin-price-container .reference-price .price {
    font-size: 0.7em;
  }
  
  .bitcoin-price-container .reference-price .price.low {
    color: red;
  }
  
  .bitcoin-price-container .reference-price .price.high {
    color: #8fdc34;
    padding-left: 6px;
  }
  
  .arrow {
    position: relative;
  }
  
  .arrow.up {
    position: absolute;
    margin: 6px;
    margin-top: 8px;
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #8fdc34;
  }
  
  .arrow.down {
    position: absolute;
    margin: 6px;
    margin-top: 12px;
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid red;
  }
  
  .theme-light {
    background-color: white;
    color: black;
  }
  
  .theme-light .bitcoin-price-container {
    color: #aaa;
  }
  
  
  .theme-dark  {
    background-color: black;
    color: white;
  }
  
  .theme-dark .bitcoin-price-container {
    color: #ccc;
  }
  `,
});
