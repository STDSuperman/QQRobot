import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import RedisCacheModule from '@modules/redis-cache/cache.module';
@Module({
	imports: [RedisCacheModule],
	providers: [ConfigService],
	exports: [ConfigService]
})
export default class ConfigModule {}
