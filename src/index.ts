import { CDP_ACTIONS, CdpAgentkit } from "@coinbase/cdp-agentkit-core";

export const schema = {
  "type": "function",
  "function": {
    "name": "agentkit_function_call",
    "description": "A tool that wraps Coinbase's AgentKit for interacting with various blockchains. Allowed functions: address_reputation, get_wallet_details, deploy_nft, deploy_token, deploy_contract, get_balance, get_balance_nft, mint_nft, register_basename, request_faucet_funds, trade, transfer, transfer_nft, wrap_eth, morpho_deposit, morpho_withdraw, pyth_fetch_price_feed_id, pyth_fetch_price, wow_buy_token, wow_sell_token, wow_create_token",
    "strict": true,
    "parameters": {
      "type": "object",
      "properties": {
        "function_args": {
          "type": "object",
          "description": "The arguments to call one of the supported functions with",
          "anyOf": [
            {
              "type": "object",
              "description": "\nThis tool checks the reputation of an address on a given network. It takes:\n\n- network: The network to check the address on (e.g. \"base-mainnet\")\n- address: The Ethereum address to check\n\nImportant notes:\n- This tool will not work on base-sepolia, you can default to using base-mainnet instead\n- The wallet's default address and its network may be used if not provided\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "address_reputation"
                  ]
                },
                "address": {
                  "type": "string",
                  "description": "The Ethereum address to check. _MUST_ adhere to the following regex pattern: `^0x[a-fA-F0-9]{40}$`."
                },
                "network": {
                  "type": "string",
                  "description": "The network to check the address on"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "address",
                "network"
              ]
            },
            {
              "type": "object",
              "description": "This tool will get details about the MPC Wallet.",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "get_wallet_details"
                  ]
                }
              },
              "additionalProperties": false,
              "required": [
                "intent"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will deploy an NFT (ERC-721) contract onchain from the wallet. \nIt takes the name of the NFT collection, the symbol of the NFT collection, and the base URI for the token metadata as inputs.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "deploy_nft"
                  ]
                },
                "name": {
                  "type": "string",
                  "description": "The name of the NFT collection"
                },
                "symbol": {
                  "type": "string",
                  "description": "The symbol of the NFT collection"
                },
                "baseURI": {
                  "type": "string",
                  "description": "The base URI for the token metadata"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "name",
                "symbol",
                "baseURI"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will deploy an ERC20 token smart contract. It takes the token name, symbol, and total supply as input. \nThe token will be deployed using the wallet's default address as the owner and initial token holder.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "deploy_token"
                  ]
                },
                "name": {
                  "type": "string",
                  "description": "The name of the token"
                },
                "symbol": {
                  "type": "string",
                  "description": "The token symbol"
                },
                "totalSupply": {
                  "type": "string",
                  "description": "The total supply of tokens to mint. In typescript it's of the type: number | bigint | Decimal"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "name",
                "symbol",
                "totalSupply"
              ]
            },
            {
              "type": "object",
              "description": "\nDeploys smart contract with required args: solidity version (string), solidity input json (string), contract name (string), and optional constructor args (Dict[str, Any])\n\nInput json structure:\n{\"language\":\"Solidity\",\"settings\":{\"remappings\":[],\"outputSelection\":{\"*\":{\"*\":[\"abi\",\"evm.bytecode\"]}}},\"sources\":{}}\n\nYou must set the outputSelection to {\"*\":{\"*\":[\"abi\",\"evm.bytecode\"]}} in the settings. The solidity version must be >= 0.8.0 and <= 0.8.28.\n\nSources should contain one or more contracts with the following structure:\n{\"contract_name.sol\":{\"content\":\"contract code\"}}\n\nThe contract code should be escaped. Contracts cannot import from external contracts but can import from one another.\n\nConstructor args are required if the contract has a constructor. They are a key-value\nmap where the key is the arg name and the value is the arg value. Encode uint/int/bytes/string/address values as strings, boolean values as true/false. For arrays/tuples, encode based on contained type.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "deploy_contract"
                  ]
                },
                "solidityVersion": {
                  "type": "string",
                  "enum": [
                    "0.8.28",
                    "0.8.27",
                    "0.8.26",
                    "0.8.25",
                    "0.8.24",
                    "0.8.23",
                    "0.8.22",
                    "0.8.21",
                    "0.8.20",
                    "0.8.19",
                    "0.8.18",
                    "0.8.17",
                    "0.8.16",
                    "0.8.15",
                    "0.8.14",
                    "0.8.13",
                    "0.8.12",
                    "0.8.11",
                    "0.8.10",
                    "0.8.9",
                    "0.8.8",
                    "0.8.7",
                    "0.8.6",
                    "0.8.5",
                    "0.8.4",
                    "0.8.3",
                    "0.8.2",
                    "0.8.1",
                    "0.8.0"
                  ],
                  "description": "The solidity compiler version"
                },
                "solidityInputJson": {
                  "type": "string",
                  "description": "The input json for the solidity compiler"
                },
                "contractName": {
                  "type": "string",
                  "description": "The name of the contract class to be deployed"
                },
                "constructorArgs": {
                  "type": "array",
                  "description": "The constructor arguments for the contract",
                  "items": {
                    "type": "object",
                    "properties": {
                      "key": {
                        "type": "string"
                      },
                      "value": {
                        "type": "string"
                      }
                    },
                    "required": ["key", "value"],
                    "additionalProperties": false
                  }
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "solidityVersion",
                "solidityInputJson",
                "contractName",
                "constructorArgs"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will get the balance of all the addresses in the wallet for a given asset. \nIt takes the asset ID as input. Always use 'eth' for the native asset ETH and 'usdc' for USDC.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "get_balance"
                  ]
                },
                "assetId": {
                  "type": "string",
                  "description": "The asset ID to get the balance for"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "assetId"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will get the NFTs (ERC721 tokens) owned by the wallet for a specific NFT contract.\n\nIt takes the following inputs:\n- contractAddress: The NFT contract address to check\n- address: (Optional) The address to check NFT balance for. If not provided, uses the wallet's default address\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "get_balance_nft"
                  ]
                },
                "contractAddress": {
                  "type": "string",
                  "description": "The NFT contract address to check balance for"
                },
                "address": {
                  "type": "string",
                  "description": "The address to check NFT balance for. If not provided, uses the wallet's default address"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "contractAddress",
                "address"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation. \nIt takes the contract address of the NFT onchain and the destination address onchain that will receive the NFT as inputs. \nDo not use the contract address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "mint_nft"
                  ]
                },
                "contractAddress": {
                  "type": "string",
                  "description": "The contract address of the NFT to mint"
                },
                "destination": {
                  "type": "string",
                  "description": "The destination address that will receive the NFT"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "contractAddress",
                "destination"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will register a Basename for the agent. The agent should have a wallet associated to register a Basename.\nWhen your network ID is 'base-mainnet' (also sometimes known simply as 'base'), the name must end with .base.eth, and when your network ID is 'base-sepolia', it must ends with .basetest.eth.\nDo not suggest any alternatives and never try to register a Basename with another postfix. The prefix of the name must be unique so if the registration of the\nBasename fails, you should prompt to try again with a more unique name.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "register_basename"
                  ]
                },
                "basename": {
                  "type": "string",
                  "description": "The Basename to assign to the agent"
                },
                "amount": {
                  "type": "string",
                  "description": "The amount of ETH to pay for registration. Default to 0.002"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "basename",
                "amount"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will request test tokens from the faucet for the default address in the wallet. It takes the wallet and asset ID as input.\nIf no asset ID is provided the faucet defaults to ETH. Faucet is only allowed on 'base-sepolia' and can only provide asset ID 'eth' or 'usdc'.\nYou are not allowed to faucet with any other network or asset ID. If you are on another network, suggest that the user sends you some ETH\nfrom another wallet and provide the user with your wallet details.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "request_faucet_funds"
                  ]
                },
                "assetId": {
                  "type": "string",
                  "description": "The optional asset ID to request from faucet. Default to ETH"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "assetId"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will trade a specified amount of a 'from asset' to a 'to asset' for the wallet.\n\nIt takes the following inputs:\n- The amount of the 'from asset' to trade\n- The from asset ID to trade \n- The asset ID to receive from the trade\n\nImportant notes:\n- Trades are only supported on mainnet networks (ie, 'base-mainnet', 'base', 'ethereum-mainnet', 'ethereum', etc.)\n- Never allow trades on any non-mainnet network (ie, 'base-sepolia', 'ethereum-sepolia', etc.)\n- When selling a native asset (e.g. 'eth' on base-mainnet), ensure there is sufficient balance to pay for the trade AND the gas cost of this trade\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "trade"
                  ]
                },
                "amount": {
                  "type": "string",
                  "description": "The amount of the from asset to trade. In typescript it's of the type: number | bigint | Decimal"
                },
                "fromAssetId": {
                  "type": "string",
                  "description": "The from asset ID to trade. If a symbol, such as `USDT`, is supplied, it needs to first be converted into a token address. If a function exists that converts from a symbol to an address, it should automatically be run before this `trade` function is run."
                },
                "toAssetId": {
                  "type": "string",
                  "description": "The to asset ID to receive from the trade. If a symbol, such as `USDT`, is supplied, it needs to first be converted into a token address. If a function exists that converts from a symbol to an address, it should automatically be run before this `trade` function is run."
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "fromAssetId",
                "toAssetId",
                "amount"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will transfer an asset from the wallet to another onchain address.\n\nIt takes the following inputs:\n- amount: The amount to transfer\n- assetId: The asset ID to transfer\n- destination: Where to send the funds (can be an onchain address, ENS 'example.eth', or Basename 'example.base.eth')\n- gasless: Whether to do a gasless transfer\n\nImportant notes:\n- Gasless transfers are only available on base-sepolia and base-mainnet (base) networks for 'usdc' asset\n- Always use gasless transfers when available\n- Always use asset ID 'usdc' when transferring USDC\n- Ensure sufficient balance of the input asset before transferring\n- When sending native assets (e.g. 'eth' on base-mainnet), ensure there is sufficient balance for the transfer itself AND the gas cost of this transfer\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "transfer"
                  ]
                },
                "amount": {
                  "type": "string",
                  "description": "The amount of the asset to transfer. In typescript it's of the type: number | bigint | Decimal"
                },
                "assetId": {
                  "type": "string",
                  "description": "The asset ID to transfer"
                },
                "destination": {
                  "type": "string",
                  "description": "The destination to transfer the funds"
                },
                "gasless": {
                  "type": "boolean",
                  "description": "Whether to do a gasless transfer. Default to false."
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "assetId",
                "destination",
                "amount",
                "gasless"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool will transfer an NFT (ERC721 token) from the wallet to another onchain address.\n\nIt takes the following inputs:\n- contractAddress: The NFT contract address\n- tokenId: The ID of the specific NFT to transfer\n- destination: Where to send the NFT (can be an onchain address, ENS 'example.eth', or Basename 'example.base.eth')\n\nImportant notes:\n- Ensure you have ownership of the NFT before attempting transfer\n- Ensure there is sufficient native token balance for gas fees\n- The wallet must either own the NFT or have approval to transfer it\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "transfer_nft"
                  ]
                },
                "contractAddress": {
                  "type": "string",
                  "description": "The NFT contract address to interact with"
                },
                "tokenId": {
                  "type": "string",
                  "description": "The ID of the NFT to transfer"
                },
                "destination": {
                  "type": "string",
                  "description": "The destination to transfer the NFT, e.g. `0x58dBecc0894Ab4C24F98a0e684c989eD07e4e027`, `example.eth`, `example.base.eth`"
                },
                "fromAddress": {
                  "type": "string",
                  "description": "The address to transfer from. If not provided, defaults to the wallet's default address"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "contractAddress",
                "tokenId",
                "destination",
                "fromAddress"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool can only be used to wrap ETH to WETH.\nDo not use this tool for any other purpose, or trading other assets.\n\nInputs:\n- Amount of ETH to wrap.\n\nImportant notes:\n- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.\n- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action.\n- 1 wei = 0.000000000000000001 WETH\n- Minimum purchase amount is 100000000000000 wei (0.0000001 WETH)\n- Only supported on the following networks:\n  - Base Sepolia (ie, 'base-sepolia')\n  - Base Mainnet (ie, 'base', 'base-mainnet')\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "wrap_eth"
                  ]
                },
                "amountToWrap": {
                  "type": "string",
                  "description": "Amount of ETH to wrap in wei"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "amountToWrap"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool allows depositing assets into a Morpho Vault. \n\nIt takes:\n- vaultAddress: The address of the Morpho Vault to deposit to\n- assets: The amount of assets to deposit in whole units\n  Examples for WETH:\n  - 1 WETH\n  - 0.1 WETH\n  - 0.01 WETH\n- receiver: The address to receive the shares\n- tokenAddress: The address of the token to approve\n\nImportant notes:\n- Make sure to use the exact amount provided. Do not convert units for assets for this action. \n- Please use a token address (example 0x4200000000000000000000000000000000000006) for the tokenAddress field. If you are unsure of the token address, please clarify what the requested token address is before continuing.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "morpho_deposit"
                  ]
                },
                "assets": {
                  "type": "string",
                  "description": "The quantity of assets to deposit, in whole units. _MUST_ adhere to the following regex pattern: `^\\d+(\\.\\d+)?$`."
                },
                "receiver": {
                  "type": "string",
                  "description": "The address that will own the position on the vault which will receive the shares. _MUST_ adhere to the following regex pattern: `^0x[a-fA-F0-9]{40}$`."
                },
                "tokenAddress": {
                  "type": "string",
                  "description": "The address of the assets token to approve for deposit. _MUST_ adhere to the following regex pattern: `^0x[a-fA-F0-9]{40}$`."
                },
                "vaultAddress": {
                  "type": "string",
                  "description": "The address of the Morpho Vault to deposit to. _MUST_ adhere to the following regex pattern: `^0x[a-fA-F0-9]{40}$`."
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "assets",
                "receiver",
                "tokenAddress",
                "vaultAddress"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool allows withdrawing assets from a Morpho Vault. It takes:\n\n- vaultAddress: The address of the Morpho Vault to withdraw from\n- assets: The amount of assets to withdraw in atomic units\n- receiver: The address to receive the shares\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "morpho_withdraw"
                  ]
                },
                "vaultAddress": {
                  "type": "string",
                  "description": "The address of the Morpho Vault to withdraw from. _MUST_ adhere to the following regex pattern: `^0x[a-fA-F0-9]{40}$`."
                },
                "assets": {
                  "type": "string",
                  "description": "The amount of assets to withdraw in atomic units e.g. 1. _MUST_ adhere to the following regex pattern: `^\\d+$`."
                },
                "receiver": {
                  "type": "string",
                  "description": "The address to receive the shares. _MUST_ adhere to the following regex pattern: `^0x[a-fA-F0-9]{40}$`."
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "vaultAddress",
                "assets",
                "receiver"
              ]
            },
            {
              "type": "object",
              "description": "\nFetch the price feed ID for a given token symbol from Pyth.\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "pyth_fetch_price_feed_id"
                  ]
                },
                "tokenSymbol": {
                  "type": "string",
                  "description": "The token symbol to fetch the price feed ID for"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "tokenSymbol"
              ]
            },
            {
              "type": "object",
              "description": "\nFetch the price of a given price feed from Pyth.\n\nInputs:\n- Pyth price feed ID\n\nImportant notes:\n- Do not assume that a random ID is a Pyth price feed ID. If you are confused, ask a clarifying question.\n- This action only fetches price inputs from Pyth price feeds. No other source.\n- If you are asked to fetch the price from Pyth for a ticker symbol such as BTC, you must first use the pyth_fetch_price_feed_id\naction to retrieve the price feed ID before invoking the pyth_Fetch_price action\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "pyth_fetch_price"
                  ]
                },
                "priceFeedID": {
                  "type": "string",
                  "description": "The price feed ID to fetch the price for"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "priceFeedID"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool can only be used to buy a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) with ETH.\nDo not use this tool for any other purpose, or trading other assets.\n\nInputs:\n- WOW token contract address\n- Address to receive the tokens  \n- Amount of ETH to spend (in wei)\n\nImportant notes:\n- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.\n- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action. \n- 1 wei = 0.000000000000000001 ETH\n- Minimum purchase amount is 100000000000000 wei (0.0000001 ETH)\n- Only supported on the following networks:\n  - Base Sepolia (ie, 'base-sepolia')\n  - Base Mainnet (ie, 'base', 'base-mainnet')\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "wow_buy_token"
                  ]
                },
                "contractAddress": {
                  "type": "string",
                  "description": "The WOW token contract address"
                },
                "amountEthInWei": {
                  "type": "string",
                  "description": "Amount of ETH to spend (in wei)"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "contractAddress",
                "amountEthInWei"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool can only be used to sell a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) for ETH.\nDo not use this tool for any other purpose, or trading other assets.\n\nInputs:\n- WOW token contract address\n- Amount of tokens to sell (in wei)\n\nImportant notes:\n- The amount is a string and cannot have any decimal points, since the unit of measurement is wei.\n- Make sure to use the exact amount provided, and if there's any doubt, check by getting more information before continuing with the action. \n- 1 wei = 0.000000000000000001 ETH\n- Minimum purchase amount is 100000000000000 wei (0.0000001 ETH)\n- Only supported on the following networks:\n  - Base Sepolia (ie, 'base-sepolia')\n  - Base Mainnet (ie, 'base', 'base-mainnet')\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "wow_sell_token"
                  ]
                },
                "contractAddress": {
                  "type": "string",
                  "description": "The WOW token contract address, such as `0x036CbD53842c5426634e7929541eC2318f3dCF7e`"
                },
                "amountTokensInWei": {
                  "type": "string",
                  "description": "Amount of tokens to sell (in wei), meaning 1 is 1 wei or 0.000000000000000001 of the token"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "contractAddress",
                "amountTokensInWei"
              ]
            },
            {
              "type": "object",
              "description": "\nThis tool can only be used to create a Zora Wow ERC20 memecoin (also can be referred to as a bonding curve token) using the WoW factory.\nDo not use this tool for any other purpose, or for creating other types of tokens.\n\nInputs:\n- Token name (e.g. WowCoin)\n- Token symbol (e.g. WOW) \n- Token URI (optional) - Contains metadata about the token\n\nImportant notes:\n- Uses a bonding curve - no upfront liquidity needed\n- Only supported on the following networks:\n  - Base Sepolia (ie, 'base-sepolia')\n  - Base Mainnet (ie, 'base', 'base-mainnet')\n",
              "properties": {
                "intent": {
                  "type": "string",
                  "description": "Hard-coded value",
                  "enum": [
                    "wow_create_token"
                  ]
                },
                "name": {
                  "type": "string",
                  "description": "The name of the token to create, e.g. WowCoin"
                },
                "symbol": {
                  "type": "string",
                  "description": "The symbol of the token to create, e.g. WOW"
                },
                "tokenUri": {
                  "type": "string",
                  "description": "The URI of the token metadata to store on IPFS. Defaults to: ipfs://QmY1GqprFYvojCcUEKgqHeDj9uhZD9jmYGrQTfA9vAE78J"
                }
              },
              "additionalProperties": false,
              "required": [
                "intent",
                "name",
                "symbol",
                "tokenUri"
              ]
            }
          ]
        }
      },
      "additionalProperties": false,
      "required": [
        "function_args"
      ]
    }
  }
}

const functions = {
  get_balance: getBalance,
  address_reputation: addressReputation,
}

type AgentKitFunction = keyof typeof functions;

async function getBalance(agentkit: CdpAgentkit, args: any) {
  const { assetId } = args;

  const getBalanceAction = CDP_ACTIONS.filter(a => a.name === 'get_balance')[0]
  const validGetBalanceArgs = getBalanceAction.argsSchema.parse({ assetId });

  return agentkit.run(getBalanceAction, validGetBalanceArgs)
}

async function addressReputation(agentkit: CdpAgentkit, args: any) {
  const { address, network } = args;

  const addressReputationAction = CDP_ACTIONS.filter(a => a.name === 'address_reputation')[0]
  const validAddressReputationArgs = addressReputationAction.argsSchema.parse({ address, network });

  return agentkit.run(addressReputationAction, validAddressReputationArgs)
}

export async function handler(event: any) {
  const { secrets, messages, args: { function_args } } = JSON.parse(event.body);
  const { intent } = function_args;

  const config = {
    cdpApiKeyName: secrets.CDP_API_KEY_NAME,
    cdpApiKeyPrivateKey: secrets.CDP_API_KEY_PRIVATE_KEY,
    cdpWalletData: secrets.WALLET_DATA_FILE,
    networkId: secrets.NETWORK_ID,
  };

  try {
    const agentkit = await CdpAgentkit.configureWithWallet(config);

    const functionToCall = functions[intent as AgentKitFunction]

    if (!functionToCall) {
      return {
        statusCode: 404,
        body: `${intent} not yet implemented`,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(await functionToCall(agentkit, function_args)),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
}
