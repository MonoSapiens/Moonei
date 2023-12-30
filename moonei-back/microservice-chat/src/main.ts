import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: 'collaborative-chat'
    }
  })
  await app.listen();
  console.log("Microservicio collaborative-chat escuchando... ")
}
bootstrap();
