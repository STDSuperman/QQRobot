import { Module } from '@nestjs/common';
import { WsGateway } from './ws.gateway';
import MiraiModule from '@modules/mirai/mirai.module';
import DBModule from '@modules/db/db.module';
import { WsService } from '@modules/ws-gateway/ws.service';
import DataAnalysis from '@modules/data-analysis/analysis.module';
@Module({
	imports: [MiraiModule, DBModule, DataAnalysis],
	providers: [WsGateway, WsService]
})
export class WsGatewayModule {}
