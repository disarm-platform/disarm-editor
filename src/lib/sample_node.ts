import jsf from 'json-schema-faker';
import {get} from 'lodash';

// Ideal would be to use simple primitives
import schema from '@disarm/config-validation/build/module/config_schema.json';

(jsf as any).option({
  alwaysFakeOptionals: true,
  fixedProbabilities: true,
  fillProperties: true,
});

export async function blank_for_path(path: string) {
  const blank = await (jsf as any).resolve(schema);
  if (path) {
    return get(blank, path, null);
  } else {
    return blank;
  }
}
