import { environment } from '../environment';

export const EndpointList = {
  patients: (id?: number) => composeUri(id !== undefined ? ['patients', id] : ['patients']),
  doctors: (id?: number) => composeUri(id !== undefined ? ['doctors', id] : ['doctors']),
};

function composeUri(values: (string | number)[]): string {
  return [
    environment.apiUrl,
    ...values
  ].join('/');
}
