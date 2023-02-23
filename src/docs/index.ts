import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import config from '../config';

import * as tags from './tags';

/**
 * buildDocs function - build docs for swagger
 * @param app - app instance
 */
function buildDocs(app: INestApplication) {
  const documentBuilder = new DocumentBuilder()
    .setTitle(config.swagger.title)
    .setDescription(config.swagger.description)
    .setVersion(config.swagger.version)
    .addBearerAuth();

  Object.values(tags).forEach((tag) => documentBuilder.addTag(tag));

  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, documentBuilder.build()));
}

export { buildDocs };
