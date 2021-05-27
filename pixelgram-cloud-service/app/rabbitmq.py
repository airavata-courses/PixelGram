import pika
import sys
from config import RABBITMQ_HOST, RABBITMQ_PORT
import json
from time import sleep
import threading


def data_processing():
    print()
    return 

class consumerMQ:

    internal_lock = threading.Lock()

    def __init__(self, queue):
        print('consumer')
        self.queue = queue
        self.connection = None
        self.channel = None
        self.create_connection()
        result = self.channel.queue_declare(
            queue=self.queue,
            durable=True,
            passive=True
        )
        thread = threading.Thread(target=self._process_data_events)
        thread.setDaemon(True)
        thread.start()
    
    def __del__(self):
        if self.connection != None:
            self.connection.close()


    def _process_data_events(self):
        self.channel.basic_consume(
            queue=self.queue,
            on_message_callback=self.callback
        )

        while True:
            with self.internal_lock:
                self.connection.process_data_events()
                sleep(0.1)

    def callback(self, ch, method, properties, body):
        ch.basic_ack(delivery_tag = method.delivery_tag)
        print("Data Read: {}".format(json.loads(body)))
    
    def create_connection(self):
        while self.connection == None or self.connection.is_closed:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=RABBITMQ_HOST,
                    port=RABBITMQ_PORT
                )
            )
            sleep(0.1)
        self.create_channel()
    
    def create_channel(self):
        while self.channel == None or self.channel.is_closed:
            self.channel = self.connection.channel()
            sleep(0.1)


class producerMQ:
    def __init__(self, queue):
        print('producer')
        self.queue = queue
        self.connection = None
        self.channel = None
        self.create_connection()
        
    def declare_queue(self):
        queueName = ''
        while queueName != self.queue:
            result = self.channel.queue_declare(
                queue=self.queue,
                durable=True
            )
            queueName = result.method.queue
            print(queueName)
            sleep(0.1)

    def create_connection(self):
        while self.connection == None or self.connection.is_closed:
            self.connection = pika.BlockingConnection(
                pika.ConnectionParameters(
                    host=RABBITMQ_HOST,
                    port=RABBITMQ_PORT,
                    heartbeat=5
                )
            )
            sleep(0.1)
        self.create_channel()
    
    def create_channel(self):
        while self.channel == None or self.channel.is_closed:
            self.channel = self.connection.channel()
            sleep(0.1)
        self.declare_queue()

    def publish_message(self, body):
        print(body)
        # self.create_connection()
        if self.channel.is_open:
            try:
                self.channel.basic_publish(
                    exchange = '',
                    routing_key = self.queue,
                    body=body,
                    properties = pika.BasicProperties(
                        delivery_mode = 2,
                    )
                )
            except Exception as e:
                print(e)
                print("Unable to push the message to queue {}".format(self.queue))
        else:
            print('{} queue is not binded. Trying to get connection'.format(self.queue))

    def __del__(self):
        if self.connection != None:
            self.connection.close()

        

