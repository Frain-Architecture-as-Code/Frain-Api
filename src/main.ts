import 'reflect-metadata';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLogger, Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            prefix: 'Frain',
        }),
    });

    const openApiDoc = SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
            .setTitle('Frain API')
            .setDescription('Infrastructure as Code')
            .setVersion('1.0')
            .addBearerAuth()
            .build(),
    );

    SwaggerModule.setup('swagger', app, cleanupOpenApiDoc(openApiDoc));

    const logger = new Logger('Main');
    const port = process.env.PORT ?? 3000;
    const host = process.env.HOST ?? 'localhost';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

    await app.listen(port);

    logger.log(
        `---- Application started on ${protocol}://${host}:${port} ----`,
    );
    logger.log(`Swagger Docs: ${protocol}://${host}:${port}/swagger`);
}
bootstrap();
