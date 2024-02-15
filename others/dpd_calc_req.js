import builder from 'xmlbuilder'

// Пример JSON данных
const jsonData = {
  pickup: { cityId: 49694102, countryCode: 'RU' },
  delivery: { cityId: 196033710, countryCode: 'RU' },
  selfPickup: false,
  selfDelivery: false,
  serviceCode: 'CSM,PCL',
  parcel: [
    { weight: 1.79, length: 27, width: 23, height: 15, quantity: 1 },
    {
      weight: 0.35,
      length: 25,
      width: 8,
      height: 4,
      quantity: 1
    },
    { weight: 8.26, length: 44, width: 42, height: 32, quantity: 1 },
    {
      weight: 6.5,
      length: 39,
      width: 35,
      height: 30,
      quantity: 1
    },
    { weight: 0.668, length: 32, width: 14, height: 8, quantity: 1 },
    {
      weight: 0.668,
      length: 32,
      width: 14,
      height: 8,
      quantity: 1
    }
  ]
}

// Создание SOAP запроса с XML 1.0
const soapRequest = builder
  .create(
    {
      'SOAP-ENV:Envelope': {
        '@xmlns:SOAP-ENV': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@xmlns:ns1': 'http://dpd.ru/ws/calculator/2012-03-20',
        'SOAP-ENV:Body': {
          'ns1:getServiceCostByParcels2': {
            request: {
              auth: {
                clientNumber: 'clientNumber',
                clientKey: 'clientKey'
              },
              pickup: {
                cityId: jsonData.pickup.cityId,
                countryCode: jsonData.pickup.countryCode
              },
              delivery: {
                cityId: jsonData.delivery.cityId,
                countryCode: jsonData.delivery.countryCode
              },
              selfPickup: jsonData.selfPickup,
              selfDelivery: jsonData.selfDelivery,
              serviceCode: jsonData.serviceCode,
              parcel: jsonData.parcel
            }
          }
        }
      }
    },
    { version: '1.0', encoding: 'UTF-8' }
  )
  .end({ pretty: true })

console.log(soapRequest)
