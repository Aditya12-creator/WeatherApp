const { default: axios } = require("axios");

const mainParent = document.querySelector('#mainParent');

axios.get('http://api.openweathermap.org/data/2.5/forecast?id=2cf55bccac33952e55dbb07f3c6759de')