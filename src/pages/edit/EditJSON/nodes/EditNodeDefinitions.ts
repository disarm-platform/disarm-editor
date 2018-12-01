import {VueConstructor} from 'vue/types/vue';

import Aggregations from './Aggregations.vue';
import Decorators from './Decorators.vue';
import Form from './Form.vue';
import Instance from './Instance.vue';
import MapFocus from './MapFocus.vue';
import SpatialHierarchy from './SpatialHierarchy.vue';
import Validations from './Validations.vue';
import IrsMonitor from './IrsMonitor.vue';
import IrsPlan from './IrsPlan.vue';
import IrsRecordPoint from './IrsRecordPoint.vue';
import IrsTasker from './IrsTasker.vue';

export interface ComponentDefinition {
  display_name: string;
  component_name: string;
  node_name: string;
  path_name: string;
  component: VueConstructor;
  show_include: boolean;
}

export interface ComponentList {
  [k: string]: VueConstructor;
}

export const edit_nodes: ComponentDefinition[] = [
  {
    display_name: 'Instance',
    component_name: 'Instance',
    node_name: 'instance',
    path_name: 'instance',
    component: Instance,
    show_include: false,
  },
  {
    display_name: 'Spatial Hierarchy',
    component_name: 'SpatialHierarchy',
    node_name: 'spatial_hierarchy',
    path_name: 'spatial_hierarchy',
    component: SpatialHierarchy,
    show_include: false,
  },
  {
    display_name: 'Map Focus',
    component_name: 'MapFocus',
    node_name: 'map_focus',
    path_name: 'map_focus',
    component: MapFocus,
    show_include: false,
  },
  {
    display_name: 'Monitor',
    component_name: 'IrsMonitor',
    node_name: 'irs_monitor',
    path_name: 'applets.irs_monitor',
    component: IrsMonitor,
    show_include: true,
  },
  {
    display_name: 'Plan',
    component_name: 'IrsPlan',
    node_name: 'irs_plan',
    path_name: 'applets.irs_plan',
    component: IrsPlan,
    show_include: true,
  },
  {
    display_name: 'Record (point)',
    component_name: 'IrsRecordPoint',
    node_name: 'irs_record_point',
    path_name: 'applets.irs_record_point',
    component: IrsRecordPoint,
    show_include: true,
  },
  {
    display_name: 'Tasker',
    component_name: 'IrsTasker',
    node_name: 'irs_tasker',
    path_name: 'applets.irs_tasker',
    component: IrsTasker,
    show_include: true,
  },
  {
    display_name: 'Form',
    component_name: 'Form',
    node_name: 'form',
    path_name: 'form',
    component: Form,
    show_include: false,
  },
  {
    display_name: 'Aggregations',
    component_name: 'Aggregations',
    node_name: 'aggregations',
    path_name: 'aggregations',
    component: Aggregations,
    show_include: false,
  },
  {
    display_name: 'Decorators',
    component_name: 'Decorators',
    node_name: 'decorators',
    path_name: 'decorators',
    component: Decorators,
    show_include: false,
  },
  {
    display_name: 'Validations',
    component_name: 'Validations',
    node_name: 'validations',
    path_name: 'validations',
    component: Validations,
    show_include: false,
  },
];

export const component_list: ComponentList = edit_nodes.reduce((acc, c: ComponentDefinition) => {
  acc[c.component_name] = c.component;
  return acc;
}, {} as ComponentList);
