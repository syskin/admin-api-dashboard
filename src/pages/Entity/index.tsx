import React from 'react';

interface Props {
  name?: string;
}

const Entity: React.FC<Props> = ({ name }) => {
    return (
        <h1>Entity page</h1>
    )
}

export default Entity
