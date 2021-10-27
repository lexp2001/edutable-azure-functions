import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { activityService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await activityService.generateExcel(context);
};

export default httpTrigger;