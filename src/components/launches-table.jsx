import { useTable, useSortBy, usePagination } from 'react-table';
import { useTableData } from '../hooks';

export function LaunchesTable({ data, state, setState }) {
  const { data: tableData, columns } = useTableData(data);

  const generateSortingIndicator = (column) =>
    column.isSorted ? (column.isSortedDesc ? ' ⬆️' : ' ⬇️') : '';

  // all the handy methods from react-table to handle fetching new data
  // on page change or page size change
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setPageSize,
    gotoPage,
    previousPage,
    nextPage,
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageSize: state.pageSize,
      },
    },
    useSortBy,
    usePagination
  );

  if (data.docs.length === 0) {
    return <p className="box">No search results</p>;
  }

  return (
    <>
      <table
        {...getTableProps()}
        className="table is-bordered is-striped is-hoverable box"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {generateSortingIndicator(column)}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {data.totalPages > 1 && (
        <nav
          className="pagination is-centered box"
          role="navigation"
          aria-label="pagination"
        >
          <button
            type="button"
            className="pagination-previous"
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                pageIndex: data.prevPage,
              }));
              previousPage();
            }}
            disabled={!data.hasPrevPage}
          >
            {'<< Previous page'}
          </button>
          <button
            type="button"
            className="pagination-next"
            onClick={() => {
              setState((prevState) => ({
                ...prevState,
                pageIndex: data.nextPage,
              }));
              nextPage();
            }}
            disabled={!data.hasNextPage}
          >
            {'Next page >>'}
          </button>
          <ul className="pagination-list">
            {[...Array(data.totalPages).keys()].map((pageNum) => (
              <li key={pageNum}>
                <button
                  type="button"
                  className={`pagination-link ${
                    pageNum + 1 === data.page && 'is-current'
                  }`}
                  onClick={() => {
                    const nextPageNum = pageNum + 1;
                    setState((prevState) => ({
                      ...prevState,
                      pageIndex: nextPageNum,
                    }));
                    gotoPage(nextPageNum);
                  }}
                >
                  {pageNum + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="select block">
        <select
          value={state.pageSize}
          onChange={(e) => {
            setState((prevState) => ({
              ...prevState,
              pageIndex: 1,
              pageSize: Number(e.target.value),
            }));
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50, 100, 200].map((nextPageSize) => (
            <option key={nextPageSize} value={nextPageSize}>
              Show {nextPageSize} per page
            </option>
          ))}
        </select>
      </div>

      <p>
        Page{' '}
        <strong>
          {state.pageIndex} of {data.totalPages}
        </strong>{' '}
      </p>
      <p>
        Total elements: <strong>{data.totalDocs}</strong>
      </p>
    </>
  );
}
