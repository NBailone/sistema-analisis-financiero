# python script

import requests , json
from datetime import date
from datetime import datetime



usuario = ""
password = ""

def safe_post(url, data=None):
    try:
        r = requests.post(url=url, data=data)
        r.raise_for_status()
        return json.loads(r.text)
    except Exception:
        return {}

def safe_get(url, headers=None):
    try:
        r = requests.get(url=url, headers=headers)
        r.raise_for_status()
        return json.loads(r.text)
    except Exception:
        return {}

r = safe_post(
    url="https://api.invertironline.com/token",
    data={
        "username": usuario,
        "password": password,
        "grant_type": "password"
    }
)
bearer = r.get('access_token', "")
refresh = r.get('refresh_token', "")

headers = {"Authorization": "Bearer " + bearer} if bearer else {}

# Consultas GET a los distintos endpoints de acciones y bonos
merval = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Acciones/merval/Argentina', headers)
panelGeneral = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Panel%20General/Argentina', headers)
burcap = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Burcap/Argentina', headers)
merval25 = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Merval%2025/Argentina', headers)
mervalArgentina = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Acciones/Merval%20Argentina/Argentina', headers)
cedears = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Acciones/CEDEARs/Argentina', headers)
bonos = safe_get('https://api.invertironline.com/api/v2/Cotizaciones/Bonos/BCAA/Argentina', headers)


monedas = safe_get('https://dolarapi.com/v1/dolares')


url1 = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,USDT,XRP,LTC,DOT,BHC,CASH,ADA,BNB,LINK,USDC,WBTC,BSV,XLM,EOS,XMR,TRX,THETA,XTZ,VET,CRO,UNI,CEL,LEO,DAI,ATOM,AAVE,DOGE,NEO,BUSD,SNX,REV,HT,FIL,DASH,MIOTA,ETC,ZIL,YFI,FTT,MKR,SUSHI,COMP,ZEC,KSM,DCR,WAVES,UMA,ALGO,OKB,OMG,EGLD,RENBTC,LRC,DGB,GRT,ONT,NEXO,STX,LUNA,BAT,BTT,RSR,ZRX,REN,ICX&tsyms=ARS,USD,EUR,ARS&api_key=11700d80140be0c3bfaa60c2c8e502f35bc7612b9b5c6fbb5576d5365d4a2cf6'
url2 = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=NEAR,AVAX,CHSB,PAX,RUNE,AMPL,QTUM,HBAR,NANO,EWT,HUSD,SC,CELO,UST,REP,ABBC,KNC,OCEAN,NXM,BTG,LSK,HEDG,TFUEL,XVG,GNO,ZEN,BAND,MAID,BNT,QNT,ZB,ANT&tsyms=ARS,USD,EUR,ARS&api_key=11700d80140be0c3bfaa60c2c8e502f35bc7612b9b5c6fbb5576d5365d4a2cf6'

r1 = safe_get(url1)
r2 = safe_get(url2)

criptomonedas = {}
i = 0
for etiqueta1 in r1:
    criptomonedas[i] = {
        'simbolo': etiqueta1,
        'precioUSD': r1[etiqueta1].get('USD', 0),
        'precioEUR': r1[etiqueta1].get('EUR', 0),
        'precioARG': r1[etiqueta1].get('ARS', 0)
    }
    i += 1
for etiqueta2 in r2:
    criptomonedas[i] = {
        'simbolo': etiqueta2,
        'precioUSD': r2[etiqueta2].get('USD', 0),
        'precioEUR': r2[etiqueta2].get('EUR', 0),
        'precioARG': r2[etiqueta2].get('ARS', 0)
    }
    i += 1

criptomonedas = json.dumps(criptomonedas)

# Registro de la fecha y hora de la consulta
fecha=datetime.today().strftime('%Y-%m-%d')


#fecha = datetime(2025, 7, 17).strftime('%Y-%m-%d')


