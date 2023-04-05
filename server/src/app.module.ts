import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import * as path from 'path'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    TrackModule,
    FileModule,
    MongooseModule.forRoot('mongodb+srv://root:97XulU2L5wQFOtSV@cluster0.fenpd2k.mongodb.net/?retryWrites=true&w=majority')
  ]
})

export class AppModule {}