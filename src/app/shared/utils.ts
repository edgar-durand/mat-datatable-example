import {MatTableDataSource} from "@angular/material/table";


/**
 * set columns from object's keys
 * @param object
 */
export const getColumns = (object: any): string[] => {
  const columns: string[] = [];
  Object.keys(object).forEach((key) => columns.push(key))
  return columns;
}

/**
 * Set search filter
 * @param filterValue
 * @param datasource
 */
export const applyFilter = (filterValue: string, datasource: MatTableDataSource<any>): void => {
  if (filterValue) {
    datasource.filter = filterValue.trim().toLowerCase();
  } else {
    datasource.filter = '';
  }
}
