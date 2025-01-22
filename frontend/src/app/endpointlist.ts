import { environment } from '../environments/environment';

function composeUri(values: (string | number)[]): string {
  return [
    environment.apiUrl,
    ...values.filter((v): v is string | number => v !== undefined && v !== null && v !== ''),
  ].join('/');
}

export const EndpointList = {
  courses: (id?: number) => composeUri(['courses', id].filter((v): v is string | number => v !== undefined)),
  patients: (id?: number) => composeUri(['patients', id].filter((v): v is string | number => v !== undefined))
};
