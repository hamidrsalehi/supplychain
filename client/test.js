
// Install the follwoing packes:
// npm install canvas --save
// npm install jsbarcode --save

const JsBarcode = require('jsbarcode');
const { Canvas } = require("canvas");

const canvas = new Canvas();
let myBarcode = JsBarcode(canvas, "Hamid");

console.log(myBarcode);
// Do what you want with the canvas
// See https://github.com/Automattic/node-canvas for more information

var fs = require('fs');
const out = fs.createWriteStream(__dirname + '/hamid/test.png');
const stream = canvas.createPNGStream();
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))