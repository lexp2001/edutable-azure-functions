import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { activityService } from '../services';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  await activityService.updateActivity(req.params.rut, context);
};

export default httpTrigger;