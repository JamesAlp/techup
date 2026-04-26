import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP = await NestFactory.create(AppModule);
  const PORT = process.env.SERVER_PORT ?? 3001;
  await APP.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
bootstrap();
