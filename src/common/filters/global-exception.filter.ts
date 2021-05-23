import {
	Catch,
	ExceptionFilter,
	ArgumentsHost,
	HttpException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptorFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const request = ctx.getRequest();
		const statusCode = exception.getStatus();

		response.status(statusCode).json({
			statusCode,
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}
