import React from 'react';
import {
    Box,
    useTheme,
} from "@mui/material";
import {useGetCustomersQuery} from "../../state/api";
import Header from "../../components/Header";
import {DataGrid} from "@mui/x-data-grid";

const Customers = () => {
    const theme = useTheme();
    const {data: customers, isLoading} = useGetCustomersQuery();
    console.log(customers);
    const columns = [
        {
            field: '_id',
            headerName: "ID",
            flex: 1
        },
        {
            field: 'name',
            headerName: "Name",
            flex: 0.5
        },
        {
            field: 'email',
            headerName: "E-mail",
            flex: 1
        },
        {
            field: 'phoneNumber',
            headerName: "Phone Number",
            flex: 0.5,
            rederCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3")
            }
        }
    ]
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='Customers' subTitle='List Of Customers'/>
            <Box>
                <DataGrid
                    loading={isLoading || !customers}
                    getRowId={(row) => row._id}
                    columns={ columns }
                    rows={customers || []}
                />
            </Box>
        </Box>
    )
}

export default Customers