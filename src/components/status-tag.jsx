import { memo } from 'react';

export const StatusTag = memo(({ success }) => {
  if (success === null) {
    return <span className="tag is-medium is-warning">Unknown</span>;
  }
  return (
    <span className={`tag is-medium is-${success ? 'success' : 'danger'}`}>
      {success ? 'Success' : 'Failed'}
    </span>
  );
});
