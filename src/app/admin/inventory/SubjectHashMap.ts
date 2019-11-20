import {Subject } from 'rxjs';
import {TableElement} from './tableElement-data.model';
export interface SHashMap {
  [key: string ]: Subject<{tables: TableElement[]}>;
}
