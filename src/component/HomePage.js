import React from 'react';
import Container from '@material-ui/core/Container';
import LeadsTable from './Table/table';

function HomePage() {
    return (
        <React.Fragment>
            <Container fixed>
                <h1>Home Page and all</h1>
                <LeadsTable />
            </Container>
        </React.Fragment>
    )
}

export default HomePage;