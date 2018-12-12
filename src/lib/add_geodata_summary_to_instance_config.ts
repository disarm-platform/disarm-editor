import { GeodataSummary, Level, RemoteGeodataLevelSummary, InstanceConfig } from '@/types';
import { cloneDeep, get, set } from 'lodash';

export const add_geodata_summary_to_instance_config =
  (live_instance_config: InstanceConfig, geodata_summary: RemoteGeodataLevelSummary[]) => {
    const instance_config_clone = cloneDeep(live_instance_config);
    const summary: GeodataSummary = {};
    const level_ids = get(instance_config_clone, 'spatial_hierarchy.levels', [])
      .map((level: Level) => level.level_id);

    const incoming = geodata_summary.filter((s) => level_ids.includes(s._id));

    const result = incoming.reduce((acc: GeodataSummary, value: RemoteGeodataLevelSummary) => {
      acc[value.level_name] = value.summary;
      return acc;
    }, {} as GeodataSummary);

    set(instance_config_clone, 'spatial_hierarchy.geodata_summary', result);

    return instance_config_clone;
  };
