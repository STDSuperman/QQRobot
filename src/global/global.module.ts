import { Module, Global, HttpModule } from '@nestjs/common';
import LoggerModule from '@/logger/logger.module';
import ConfigModule from '@/config/config.module';

@Global()
@Module({
    imports: [
        LoggerModule,
        ConfigModule
    ],
    exports: [LoggerModule, ConfigModule]
})
export default class GlobalModule {}