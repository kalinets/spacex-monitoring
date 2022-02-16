import { useState } from 'react';
import { useQuery } from 'react-query';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { Preloader } from './preloader';
import { LaunchesTable } from './launches-table';

export function LaunchesPage() {
  const [state, setState] = useState({
    pageIndex: 1,
    pageSize: 10,
    name: '',
  });

  // a quite simple implementation of useQuery
  // I'd elaborate on it and make more flexible API calls to get extra
  // information about rocket, crew, launchpads, show media like pictures
  // and video in separate modal, expandable table item or separate page
  const { isLoading, error, data } = useQuery(
    ['launches', state.pageSize, state.pageIndex, state.name],
    () =>
      axios.post('https://api.spacexdata.com/v5/launches/query', {
        query: state.name
          ? {
              name: state.name.trim(),
            }
          : {},
        options: {
          page: state.pageIndex,
          limit: state.pageSize,
          sort: {
            date_utc: 'desc',
          },
        },
      }),
    {
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <div className="block">
        {/*
          an input with debounced search by launch name,
          I'd investigate why it only works case sensitive
        */}
        <DebounceInput
          placeholder="search by name (case sensitive)"
          debounceTimeout={333}
          className="input"
          onChange={(event) =>
            setState({
              pageIndex: 1,
              pageSize: 10,
              name: event.target.value,
            })
          }
        />
      </div>
      {isLoading && <Preloader />}
      {error && <p>Something went wrong. Please reload the page</p>}
      {data && (
        <LaunchesTable data={data.data} state={state} setState={setState} />
      )}
    </>
  );
}
