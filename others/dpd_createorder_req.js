import builder from 'xmlbuilder'

const jsonData = {
  orders: {
    auth: { clientNumber: 1001024827, clientKey: '<secret - omitted>' },
    header: {
      datePickup: '2024-02-16',
      senderAddress: { code: 'h0' },
      pickupTimePeriod: '9-18',
      regularNum: 9260
    },
    order: [
      {
        orderNumberInternal: 1708007811,
        serviceCode: 'PCL',
        serviceVariant: 'ДД',
        cargoNumPack: 5,
        cargoWeight: 0.25,
        cargoVolume: 0.01,
        cargoRegistered: false,
        cargoValue: 2250,
        cargoCategory:
          'С договором оферты и правилами возврата/обмена ознакомлен',
        deliveryTimePeriod: '9-18',
        receiverAddress: {
          name: 'Иванов Иван Иванович 1708007811',
          countryName: 'Россия',
          region: 'Челябинская обл',
          city: 'г. Челябинск',
          street: 'Августовская',
          streetAbbr: 'ул',
          house: 3,
          flat: 13,
          contactFio: 'Иванов Иван Иванович 1708007811',
          contactPhone: 79111111111,
          instructions: 'Test'
        },
        extraService: [
          {
            esCode: 'SMS',
            param: { name: 'phone', value: '+7 911 111-11-11' }
          },
          { esCode: 'ОЖД', param: { name: 'reason_delay', value: 'ПРОС' } },
          { esCode: 'ПРД' }
        ],
        parcel: [
          {
            number: '1708007811TP2401',
            weight: 0.02,
            length: 10,
            width: 7,
            height: 2
          },
          {
            number: '1708007811TP2402',
            weight: 0.02,
            length: 10,
            width: 7,
            height: 2
          },
          {
            number: '1708007811TP2403',
            weight: 0.07,
            length: 12,
            width: 8,
            height: 2
          },
          {
            number: '1708007811TP2404',
            weight: 0.07,
            length: 12,
            width: 8,
            height: 2
          },
          {
            number: '1708007811TP2405',
            weight: 0.07,
            length: 12,
            width: 8,
            height: 2
          }
        ],
        unitLoad: [
          {
            article: 'delivery',
            descript: 'Доставка',
            npp_amount: 210,
            vat_percent: 20,
            count: 1
          },
          {
            article: 109621,
            descript:
              'Элемент питания GP ACM02F-2CR12 (LR44,626,54,42 12 штук)',
            declared_value: 390,
            npp_amount: 390,
            vat_percent: 20,
            count: 2
          },
          {
            article: 109622,
            descript: 'Элемент питания GP Extra Alkaline 24AX-2CR6 (AAA, 6шт)',
            declared_value: 490,
            npp_amount: 490,
            vat_percent: 20,
            count: 3
          }
        ]
      }
    ]
  }
}

const soapRequest = builder
  .create(
    {
      'S:Envelope': {
        '@xmlns:S': 'http://schemas.xmlsoap.org/soap/envelope/',
        '@xmlns:order': 'http://dpd.ru/ws/order2/2012-04-04',
        'S:Body': {
          'order:createOrder': {
            orders: {
              auth: {
                clientNumber: 'clientNumber',
                clientKey: 'clientKey'
              },
              header: jsonData.orders.header,
              order: jsonData.orders.order
            }
          }
        }
      }
    },
    { version: '1.0', encoding: 'UTF-8' }
  )
  .end({ pretty: true })

console.log(soapRequest)
