import { ComponentProps } from 'react';

import { FaSpinner } from 'react-icons/fa';

function Spinner(props: ComponentProps<any>) {
  return (
    <span {...props}>
      <FaSpinner className="icon-loading" />
    </span>
  );
}

export default Spinner;
