const SupplyChain = artifacts.require("./SupplyChain.sol");

var accounts;
var owner;

contract("SupplyChain", accounts => {
  
  myAccounts = accounts;
  farmer = myAccounts[0];
  distributor = myAccounts[1];
  retailer = myAccounts[2];
  consumer = myAccounts[3];

  console.log(myAccounts);

  it("harvest a peach...", async () => {
    let instance = await SupplyChain.deployed();
    console.log(`Contarct Address: ${await instance.contarctAddress.call()}`);
    let upc = 1001;
    let FarmName = "Freddy";
    let FarmInformation = "Not available";
    let FarmLatitude = "34N";
    let FarmLongitude = "118W";
    let productNotes = "organic";
    await instance.harvestItem(upc, FarmName, FarmInformation, FarmLatitude, FarmLongitude, productNotes, {from: farmer});
    console.log(`# of SKUs: ${await instance.sku.call()-1}`);

    assert.equal(1,1);
  });
});
