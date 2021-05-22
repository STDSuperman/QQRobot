import { Module, HttpModule } from '@nestjs/common';
import { UserService } from './user.service'
import { ConfigService } from '../config/config.service';

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: async (configService: ConfigService) => configService.get('BotHttpConfig'),
            inject: [ConfigService]
        })
    ],
    providers: [UserService],
    exports: [UserService]
})
export default class UserModule {}