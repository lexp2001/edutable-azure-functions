import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { metricService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await metricService.getRegisteredUsers(context);
};

export default httpTrigger;