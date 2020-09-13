import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import LeadsTable from './Table/table';

function HomePage() {
    return (
        <React.Fragment>
            <Container fixed>
                <Paper elevation={3}>
                    <div>
                        <h3 style={{ display: 'flex', justifyContent: 'center' }}>Leads Table List</h3>
                    </div>
                    <LeadsTable />
                </Paper>
            </Container>
        </React.Fragment>
    )
}

export default HomePage;