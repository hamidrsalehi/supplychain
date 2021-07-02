import './App.css';
import React, {useState, useEffect} from "react"
import getWeb3 from "./getWeb3";
import SupplyChainContract from "./contracts/SupplyChain.json";

function App() {

  const [web3, setWeb3] = useState("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState("");

  const [currentOwner, setCurrentOwner] = useState("0x01b0d75bbcC5d322D721564E5dbB1F5aEE2d6E1b");

  const [sku, setSKU] = useState(1);
  const [upc, setUPC] = useState(1);
  const [originFarmerID, setOriginFarmerID] = useState("0x01b0d75bbcC5d322D721564E5dbB1F5aEE2d6E1b");
  const [originFarmName, setOriginFarmName] = useState("Hamid Salehi");
  const [originFarmInformation, setOriginFarmInformation] = useState("Silicon Valley");
  const [originFarmLatitude, setOriginFarmLatitude] = useState("-38.239770");
  const [originFarmLongitude, setOriginFarmLongitude] = useState("144.341490");
  const [productNotes, setProductNotes] = useState("Best beans for Espresso");

  const [txState, setTxState] = useState({
    harvested: "",
    processed: "",
    packed: "",
    forsale: "",
    sold: "",
    shipped: "",
    received: "",
    purchased: ""
  });

  const [productPrice, setProductPrice] = useState("");
  
  const FarmerID = "0x01b0d75bbcC5d322D721564E5dbB1F5aEE2d6E1b";
  const DistributorID = "0xf1b1bcd24dad92303dd9fe78be639f7bcf9c238d";

  useEffect(() => {
    const updatePage = async () => {
      try {
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const account = await web3.eth.getAccounts();
        console.log(account);

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SupplyChainContract.networks[networkId];
        const instance = new web3.eth.Contract(
        SupplyChainContract.abi,
        deployedNetwork && deployedNetwork.address,
        );
        console.log("contract address", deployedNetwork.address);
        setWeb3(web3);
        setAccount(account);
        setContract(instance);

        setProductPrice(web3.utils.toWei("1", "ether"));

        // Add & Check roles
        let isFarmer = await instance.methods.isFarmer(FarmerID).call();
        console.log(FarmerID, " farmer? ", isFarmer);
      

        if(!isFarmer) {
          console.log("adding farmer ...");      
          // Add a Farmer
          instance.methods.addFarmer(FarmerID).send({from: account[0]})
          .then(receipt => {
            console.log(receipt);
          })
          .catch(err => {
            console.log(err);
          });
        }     
      } catch (error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }

    };
    updatePage();
  });

  function handleSKU(event){
    setSKU(event.target.value);  
    console.log(event.target.value);
  } 
  function handleUPC(event){
    setUPC(event.target.value);  
    console.log(event.target.value);
  } 
  function handleCurrentOwner(event){
    setCurrentOwner(event.target.value);  
    console.log(event.target.value);
  } 

  function handleFarmerID(event){
    setOriginFarmerID(event.target.value);  
    console.log(event.target.value);
  }  
  function handleFarmName(event){
    setOriginFarmName(event.target.value);  
    console.log(event.target.value);
  }
  function handleFarmInformation(event){
    setOriginFarmInformation(event.target.value);  
    console.log(event.target.value);
  }
  function handleFarmLatitude(event){
    setOriginFarmLatitude(event.target.value);  
    console.log(event.target.value);
  }
  function handleFarmLongitude(event){
    setOriginFarmLongitude(event.target.value);  
    console.log(event.target.value);
  }

  async function handleFetchOne(event) { 
    console.log("fetch data one");
  let data = await contract.methods.fetchItemBufferOne(upc).call();
    console.log(data);

  }

  async function handleFetchTwo(event) { 
    console.log("fetch data Two");
  let data = await contract.methods.fetchItemBufferTwo(upc).call();
    console.log(data);

  }

  async function handleHarvest(event){
    console.log("harvest clicked");
    console.log("Farmer ID: ", originFarmerID);
    console.log("Farm Name: ", originFarmName);
    console.log("Farm Information: ", originFarmInformation);
    console.log("Farm Latitude:", originFarmLatitude);
    console.log("Farm Longtitude:", originFarmLongitude);
    console.log("Product Notes:", productNotes);
    console.log("harvest initiated ............................");

    let contractAddress = await contract.methods.contarctAddress().call();
    console.log(contractAddress);
    console.log(originFarmerID);


    contract.methods.harvestItem(
      upc, 
      originFarmerID, 
      originFarmName, 
      originFarmInformation, 
      originFarmLatitude, 
      originFarmLongitude, 
      productNotes)
    .send({from: FarmerID})
    .then(receipt => {
        console.log(receipt);
        console.log("Harvested -", receipt.transactionHash);
        let value = `Harvested - ${receipt.transactionHash}`;
        setTxState(prevState => {
          return{
              harvested: value,
              processed: prevState.processed,
              packed: prevState.packed,
              forsale: prevState.forsale,
              sold: prevState.sold,
              shipped: prevState.shipped,
              received: prevState.received,
              purchased: prevState.purchased
          }
        });
    })
    .catch(err => {
        console.log('something went wrong with harvesting', err);
    }); 
  }

  async function handleProcess(event){
    console.log("process");
    contract.methods.processItem(upc)
    .send({from: FarmerID})
       .then(receipt => {
        console.log(receipt);
        console.log("Processed -", receipt.transactionHash);
        let value = `Processed - ${receipt.transactionHash}`;
        setTxState(prevState => {
          return{
              harvested: prevState.harvested,
              processed: value,
              packed: prevState.packed,
              forsale: prevState.forsale,
              sold: prevState.sold,
              shipped: prevState.shipped,
              received: prevState.received,
              purchased: prevState.purchased
          }
        });
    })
    .catch(err => {
        console.log('something went wrong', err);
    }); 
  }

  async function handlePack(event){
    console.log("pack");
    contract.methods.packItem(upc)
    .send({from: FarmerID})
       .then(receipt => {
        console.log(receipt);
        console.log("Packed -", receipt.transactionHash);
        let value = `Packed - ${receipt.transactionHash}`;
        setTxState(prevState => {
          return{
              harvested: prevState.harvested,
              processed: prevState.processed,
              packed: value,
              forsale: prevState.forsale,
              sold: prevState.sold,
              shipped: prevState.shipped,
              received: prevState.received,
              purchased: prevState.purchased
          }
        });
    })
    .catch(err => {
        console.log('something went wrong', err);
    }); 
  }

  async function handleForSale(event){
    console.log("for sale");
    contract.methods.sellItem(upc, productPrice)
    .send({from: FarmerID})
       .then(receipt => {
        console.log(receipt);
        console.log("For Sale -", receipt.transactionHash);
        let value = `For Sale - ${receipt.transactionHash}`;
        setTxState(prevState => {
          return{
              harvested: prevState.harvested,
              processed: prevState.processed,
              packed: prevState.packed,
              forsale: value,
              sold: prevState.sold,
              shipped: prevState.shipped,
              received: prevState.received,
              purchased: prevState.purchased
          }
        });
    })
    .catch(err => {
        console.log('something went wrong', err);
    }); 
  }

  return (
    <div className="container">
     <h1>
       Fair Trade Coffee
     </h1>
     <hr/>
     <p>Prove the authenticity of coffee using the Ethereum blockchain.</p>
     <br/>
     <div id="ftc-harvest">
       <h2>Product Overview</h2>
       <div className="form-group">
         UPC
         <br/>
         <input className="input-field" type="number" id="fetchUPC" name="fetchsku" onChange={handleUPC} value={upc} />
         <br/>
         <div className="button-div">
                <button className="btn-fetchOne" id="button" type="button" data-id="9" onClick={handleFetchOne}>Fetch Data 1</button>
                <button className="btn-fetchTwo" id="button" type="button" data-id="10" onClick={handleFetchTwo}>Fetch Data 2</button>
         </div>
       </div>
     </div>
     <div className="form-break"></div>
        <h2>Farm Details</h2>
        <div className="form-group">
          UPC
          <br/>
          <input type="number" id="upc" name="upc" onChange={handleUPC} value={upc} />
          <br/>
          Farmer ID
          <br/>
          <input type="text" id="originFarmerID" name="originFarmerID" onChange={handleFarmerID} value={originFarmerID} size="50"/>
          <br/>
          Farm Name
          <br/>
          <input type="text" id="originFarmName" name="originFarmName" onChange={handleFarmName} value={originFarmName}/>
          <br/>
          Farm Information
          <br/>
          <input type="text" id="originFarmInformation" name="originFarmInformation" onChange={handleFarmInformation} value={originFarmInformation}/>
          <br/>
          Farm Latitude
          <br/>
          <input type="text" id="originFarmLatitude" name="originFarmLatitude" onChange={handleFarmLatitude} value={originFarmLatitude}/>
          <br/>
          Farm Longitude
          <br/>
          <input type="text" id="originFarmLongitude" name="originFarmLongitude" onChange={handleFarmLongitude} value={originFarmLongitude}/>
          <br/>
          <button className="btn-harvest" id="button" type="button" data-id="1" onClick={handleHarvest}>Harvest</button>
          <button className="btn-process" id="button" type="button" data-id="2" onClick={handleProcess}>Process</button>
          <button className="btn-pack" id="button" type="button" data-id="3" onClick={handlePack}>Pack</button>
          <button className="btn-forsale" id="button" type="button" data-id="4" onClick={handleForSale}>ForSale</button>
        </div>
        <div className="form-break"></div>
        <h2>Product Details</h2>
        <div className="form-group">
          Product Notes
          <br/>
          <input type="text" id="productNotes" name="productNotes" value="Best beans for Espresso" size="60"/>
          <br/>
          Product Price
          <br/>
          <input type="number" id="productPrice" name="productPrice" value="1"/>ETH
          <br/>
          Distributor ID
          <br/>
          <input type="text" id="distributorID" name="distributorID" value="0xf1b1bcd24dad92303dd9fe78be639f7bcf9c238d" size="50"/>
          <br/>
          Retailer ID
          <br/>
          <input type="text" id="retailerID" name="retailerID" value="0x0fb2bfefd526966c87efa19f6693d50971763fc2" size="50"/>
          <br/>
          Distributor ID
          <br/>
          <input type="text" id="consumerID" name="consumerID" value="0x5d777e9127b28fb119e81a6304278a0a21bef1c4" size="50"/>
          <br/>
          <br/>
          <button className="btn-buy" id="button" type="button" data-id="5">Buy</button>
          <button className="btn-ship" id="button" type="button" data-id="6">Ship</button>
          <button className="btn-receive" id="button" type="button" data-id="7">Receive</button>
          <button className="btn-purchase" id="button" type="button" data-id="8">Purchase</button>
        </div>
        <div className="form-break"></div>
        <hr/>
        <h2>Transaction History<span id="ftc-history"></span></h2>
        <div>
          <ul id="ftc-events">
            <li>{txState.harvested}</li>
            <li>{txState.processed}</li>
            <li>{txState.packed}</li>
            <li>{txState.forsale}</li>
            <li>{txState.sold}</li>
            <li>{txState.shipped}</li>
            <li>{txState.received}</li>
            <li>{txState.purchased}</li>
         </ul>
        <br/>
        <hr/>
        </div>
    </div>
  );
}

export default App;