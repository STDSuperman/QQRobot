import { Module, HttpModule } from '@nestjs/common';
import { MiraiService } from './mirai.service';
import { ConfigService } from '@/modules/config/config.service';
import { UserService } from '@/modules/user/user.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: async (configService: ConfigService) => configService.get('BotHttpConfig'),
            inject: [ConfigService]
        })
    ],
    providers: [MiraiService, UserService],
    exports: [MiraiService]
})
export default class ConfigModule {}