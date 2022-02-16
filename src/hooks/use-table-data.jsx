import { useMemo } from 'react';
import { StatusTag } from '../components';

export function useTableData(response) {
  const data = useMemo(
    () =>
      response.docs.map((launch) => ({
        number: launch.flight_number,
        patch: launch.links.patch.small ? (
          <img src={launch.links.patch.small} alt={launch.name} width={70} />
        ) : (
          'oops, no image ☹️'
        ),
        name: launch.name,
        date: new Date(launch.date_utc).toUTCString(),
        status: <StatusTag success={launch.success} />,
        details: launch.details,
      })),
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Flight #',
        accessor: 'number',
      },
      {
        Header: 'Patch',
        accessor: 'patch',
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Details',
        accessor: 'details',
      },
    ],
    []
  );

  return { columns, data };
}
