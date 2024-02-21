import amqp from 'amqplib'
import { describe, expect, it } from '@jest/globals'

// Функция для отправки сообщения в RabbitMQ
async function sendMessage(queueName, message, priority) {
  const connection = await amqp.connect('amqp://user:password@localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName, {
    durable: true,
    arguments: { 'x-max-priority': priority }
  })
  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true })
  console.log(`Sent message: ${message}`)
  setTimeout(() => {
    connection.close()
  }, 500)
}

// Функция для получения сообщения из RabbitMQ
async function getAllMessages(queueName, priority) {
  const connection = await amqp.connect('amqp://user:password@localhost:5672')
  const channel = await connection.createChannel()
  await channel.assertQueue(queueName, {
    durable: true,
    arguments: { 'x-max-priority': priority }
  })

  const messages = []

  await new Promise((resolve, reject) => {
    channel.consume(
      queueName,
      msg => {
        messages.push(msg)
      },
      { noAck: false }
    )

    setTimeout(() => {
      resolve()
    }, 500) // Ждем полсекунды, чтобы получить все сообщения
  })

  console.log(`Received ${messages.length} messages from queue.`)
  setTimeout(() => {
    connection.close()
  }, 500)

  return messages
}

describe('RabbitMQ interaction', () => {
  it('should send and receive message', async () => {
    const queueName = 'cdek_calcbps_q'
    const message = 'Hello RabbitMQ!'
    // await sendMessage(queueName, message)
    const receivedMessage = await getAllMessages(queueName, 10)

    for (let i = 0; i < receivedMessage.length; i++) {
      console.log(receivedMessage[i].properties.headers)
    }
    // expect(receivedMessage.properties.headers['X-Origin-Fias']).toBe(
    //   '762758bb-18b9-440f-bc61-8e1e77ff3fd8'
    // )
  })
})
