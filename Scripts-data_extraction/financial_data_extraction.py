# python script

import requests , json
from datetime import date
from datetime import datetime



usuario = ""
password = ""


try:
    r = json.loads(requests.post(
        url="https://api.invertironline.com/token",
        data={
            "username": usuario,
            "password": password,
            "grant_type": "password"
        }
    ).text)
    bearer = r['access_token']
    refresh = r['refresh_token']
except Exception:
    bearer = ""
    refresh = ""

try:
    merval = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Merval/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    merval = {}

try:
    panelGeneral = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Panel%20General/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    panelGeneral = {}

try:
    burcap = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Burcap/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    burcap = {}

try:
    merval25 = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Merval%2025/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    merval25 = {}

try:
    mervalArgentina = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Merval%20Argentina/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    mervalArgentina = {}

try:
    cedears = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Acciones/CEDEARs/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    cedears = {}

try:
    bonos = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/bonos/BCAA/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    bonos = {}

try:
    opciones = json.loads(requests.get(
        url='https://api.invertironline.com/api/v2/Cotizaciones/Opciones/Todas/Argentina',
        headers={"Authorization": "Bearer " + bearer}
    ).text)
except Exception:
    opciones = {}

try:
    monedas = json.loads(requests.get(
        url='https://dolarapi.com/v1/dolares'
    ).text)
except Exception:
    monedas = {}

#Criptomonedas

nombres = ["Bitcoin","Ethereum","Tether","XRP","Litecoin","Polkadot","BillionHappiness","Bitcoin Cash","Cardano","Wrapped BNB","Chainlink","USD Coin","Wrapped Bitcoin",
           "Bitcoin SV","Stellar","EOS","Monero","TRON","THETA","Tezos","VeChain","Crypto.com Coin","Uniswap","Celsius","UNUS SED LEO","Dai","Cosmos","Aave","Dogecoin",
           "Neo","BUSD","Synthetix","Revain","Huobi Token","Filecoin","Dash","IOTA","Ethereum Classic","Zilliqa","yearn.finance","FTX Token","Maker","SushiSwap",
           "Compound","Zcash","Kusama","Decred","Waves","UMA","Algorand","OKB","OMG Network","Elrond","renBTC","Loopring","DigiByte","The Graph","Ontology",
           "Nexo","Stacks","Terra","Basic Attention Tok","BitTorrent","Reserve Rights","0x","Ren","ICON","NEAR Protocol","Avalanche","SwissBorg","Paxos Standard",
		   "THORChain","Ampleforth","Qtum","Hedera Hashgraph","Nano","Energy Web Toke","HUSD","Siacoin",
           "Celo","TerraUSD","Augur","ABBC Coin","Kyber Network","Ocean Protocol","Nexus Mutual","Bitcoin Gold","Lisk","Hedge","Theta Fuel","Verge","Gnosis",
           "Horizen","Band Protocol","MaidSafeCoin","Bancor Network Token","Quant","ZB Token","Aragon"]


simbolos = ["BTC","ETH","USDT","XRP","LTC","DOT","BHC","CASH","ADA","BNB","LINK","USDC","WBTC","BSV","XLM","EOS","XMR","TRX","THETA","XTZ","VET","CRO","UNI","CEL",
			"LEO","DAI","ATOM","AAVE","DOGE","NEO","BUSD","SNX","REV","HT","FIL","DASH","MIOTA","ETC","ZIL","YFI","FTT","MKR","SUSHI","COMP","ZEC","KSM","DCR","WAVES","UMA",
			"ALGO","OKB","OMG","EGLD","RENBTC","LRC","DGB","GRT","ONT","NEXO","STX","LUNA","BAT","BTT","RSR","ZRX","REN","ICX","NEAR","AVAX","CHSB","PAX","RUNE","AMPL","QTUM",
			"HBAR","NANO","EWT","HUSD","SC","CELO","UST","REP","ABBC","KNC","OCEAN","NXM","BTG","LSK","HEDG","TFUEL","XVG","GNO","ZEN","BAND","MAID","BNT","QNT","ZB","ANT"]

nombresCriptos={}
i=0
for s in simbolos:
    nombresCriptos[i] = {'simbolo': simbolos[i],'nombre':nombres[i]}
    i = i + 1


criptomonedas = json.dumps(nombresCriptos)


