## Example CSV

Date | Received Quantity | Received Currency | Sent Quantity | Sent Currency | Fee Amount | Fee Currency | Tag
-- | -- | -- | -- | -- | -- | -- | --
06/14/2017 20:57:35 | 0.5 | BTC | 4005.8 | USD | 0.00001 | BTC |  
08/19/2017 10:05:15 | 0.3 | BTC | 3 | ETH |   |   |  
08/21/2017 12:00:00 |   |   | 3 | ETH | 0.0001 | ETH | gift
08/30/2017 12:01:30 | 3 | ETH |   |   |   |   | mined

## Requirements
1. The first (header) row must exactly match the example
1. The required date format is MM/DD/YYYY HH:MM:SS (e.g. 09/30/2019 07:19:01)
1. No negative numbers
1. Currency symbols must match the ones available when adding manual transactions
1. Send/withdrawal transactions:
    - Should have empty values for the received quantity and received currency
    - Sent Quantity should include fees
1. Receive/deposit transactions:
    - Should have empty values for the sent quantity and sent currency
    - Received Quantity should *NOT* include fees
1. Trade transactions:
    - Should have values for the received quantity, received currency, sent quantity, and sent currency
1. Tag (optional):
    - Send transactions possible values include: gift, lost, donation
    - Receive transactions possible values include: fork, airdrop, mined, payment, staked
    - trades and transfers cannot have tagged values
1. Importing transactions that already exist in your account will result in duplicate transactions