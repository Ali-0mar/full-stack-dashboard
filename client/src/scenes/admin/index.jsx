import React from 'react';
import {Box, useTheme} from "@mui/material";
import {useGetAdminsQuery} from "../../state/api";
import {DataGrid} from "@mui/x-data-grid";
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomMenu'
const Admin = () => {
    const {data, isLoading} = useGetAdminsQuery();
    const theme = useTheme();
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
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3")
            }
        },
        {
            field: 'country',
            headerName: "Country",
            flex: 0.4
        },
        {
            field: 'occupation',
            headerName: "Occupation",
            flex: 1
        },
        {
            field: 'role',
            headerName: "Role",
            flex: 0.5
        },
    ]
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='Admins' subTitle='List Of Admins'/>
            <Box
                mt='40px'
                height='75vh'
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none'
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: theme.palette.background['alt'],
                        color: theme.palette.secondary[100],
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: theme.palette.primary.light,
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: theme.palette.background['alt'],
                        color: theme.palette.secondary[100],
                        borderTop: 'none'
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${theme.palette.secondary[200]} !important`,
                    },

                }}
            >
                <DataGrid
                    loading={isLoading || !data}
                    columns={ columns }
                    rows={data || []}
                    getRowId={(row) => row._id}
                    components={{
                        ColumnMenu: CustomColumnMenu
                    }}
                />
            </Box>
        </Box>

    )
}

export default Admin