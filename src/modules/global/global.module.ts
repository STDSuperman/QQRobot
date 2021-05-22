import { Module, Global, HttpModule } from '@nestjs/common';
import LoggerModule from '@/modules/logger/logger.module';
import ConfigModule from '@/modules/config/config.module';

@Global()
@Module({
    imports: [
        LoggerModule,
        ConfigModule
    ],
    exports: [LoggerModule, ConfigModule]
})
export default class GlobalModule {}