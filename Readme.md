
Truffle v5.3.7 (core: 5.3.7)
Truffle React box was used to implement the project and create a frontend website

Solidity - ^0.8.0 (solc-js)
Solidity version 8 was used to create smart contarcts 

Node v12.22.1
Node version 12 was adopted to remain in sync with truffle version 5.x

Web3.js v1.3.6
Web3 is used to intercact with the smartContract on Rinkeby network

@truffle/hdwallet-provider: v1.4.0
hdwallet-provider used to conenct to rinkeby network using Infura 

dotenv: v10.0.0
used to store environment variable 

truffle-assertions: v0.9.2
is useed to create test scenarios 


tx hash: 0x903181adebd549b5d7976dc2951c5c46854484b1d62265d46e973b4e88d950b3

contract owner: 0x62F309C7A0d5a0EdEB86f7829a3eA2f6243d6C35

Transaction History

	• Harvested - 0x13a67e331a21903fa4d30be0c0eb80c542e2f0f28cbefb5fde25a869e8267f86
	
	• Processed - 0x1c622f5f25147ed251ff431f5b4fde76658b78f2e877db435ed0bdec48608326
	
	• Packed - 0xffa2e5faf187bc5b4d7c620d1cf1a89bf0f41000c2e6f7dfc7b90fe008d96a4c
	
	• For Sale - 0x509a606e535c86e157949666a544050c232ed797617232b0c0a4c656ac0737b7
	
	• Buy - 0x8cb40a1ec31835288a4f27db7836fa6b780f4732306f38570ac28146c432eda3
	
	• Ship - 0xdc602a17ac6cdafc8bc3b32bcc046b69b60bb25ab506c9cc0bee59666fe1fa73
	
	• Receive - 0x146c01c0c443f32e52bc61c9c921334c986e15575d394239a1352c4dc13dcfc2
	
	• Purchase - 0x267ef5612244a6021574d7d2e8b05d1e47b441f2878ee34c14f1f4d7ed209139


Testing done on local Ganache, with the following roles:

  const [originFarmerID, setOriginFarmerID] = useState("0x01b0d75bbcC5d322D721564E5dbB1F5aEE2d6E1b");
  const [DistributorID, setDistributorID] = useState("0x37b7227878f8b3d7d3b7AfF4Feb149dCCAD507eD");
  const [RetailerID , setRetailerID] = useState("0x21307ec7733Bf56d89d31A5BE65b235b0765fEc2");
  const [ConsumerID, setConsumerID] = useState("0x77ad276A6b7C04D43AbdbD87C7fc27D26ED5FE7F");

This program used truffle react. To run the app:

> > cd client
> > npm start
