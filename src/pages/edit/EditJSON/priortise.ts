import {TUnifiedResponse} from '@locational/config-validation/build/main/lib/TUnifiedResponse';
import {ValidationMessage} from '@/types';

export function do_prioritise_messages(v: TUnifiedResponse): ValidationMessage[] {
  const result: ValidationMessage[] = [];

  if (v.status === 'Green') {
    result.push({status: 'Green', message: 'No probs'});
    return result;
  }

  if (v.edge_messages.length) {
    v.edge_messages.filter((m) => m.status.match(/^Red/)).forEach((m) => {
      if (m.custom_edge_responses.length > 0) {
        m.custom_edge_responses.forEach((c) => {
          result.push({
            message: c.message,
            status: 'Red',
            source_node: m.source_node_name,
          });
        });
      } else {
        result.push({
          message: m.message,
          status: 'Red',
          source_node: m.source_node_name,
        });
      }
    });
    return result;
  } else {
    const support_messages = v.support_messages;
    if (support_messages) {
      const failed: ValidationMessage[] = support_messages.map(
        (m) =>
          ({
            message: m,
            status: 'Red',
            node_name: null,
          } as ValidationMessage),
      );
      return result.concat(failed);
    }
  }

  return result;
}