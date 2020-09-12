import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

//Custom import
import LeadsTable from './Table/table';
import CustomToastr from '../utils/toastr';
import LeadService from '../service/leadService';


function HomePage() {

    const [leadDataList, setLeadDataList] = useState([]);

    useEffect(() => {
        getAllLeadsData();
    }, [])

    const getAllLeadsData = async () => {
        let response = await LeadService.getLadsData();

        try {
            if (!response) CustomToastr.error('unable to fetch Leads Data');
            setLeadDataList(response);

        } catch (error) {
            CustomToastr.error('SOmething went wrong' || error)
        }
    }

    return (
        <React.Fragment>
            <Container fixed>
                <h1>Home Page and all</h1>
                <LeadsTable rows={leadDataList} />
            </Container>
        </React.Fragment>
    )
}

export default HomePage;