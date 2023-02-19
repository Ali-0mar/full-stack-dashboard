import React from 'react';
import {Box, useTheme} from "@mui/material";
import {useGetUserPerformanceQuery} from "../../state/api";
import {useSelector} from "react-redux";
import {DataGrid} from "@mui/x-data-grid";
import Header from 'components/Header';
import CustomColumnMenu from 'components/DataGridCustomMenu'
const Performance = () => {
    const userId = useSelector((state) => state.global.user)
    console.log(userId)
    const {data, isLoading} = useGetUserPerformanceQuery(userId);
    console.log(data)
    const theme = useTheme();
    const columns = [
        {
            field: '_id',
            headerName: "ID",
            flex: 1
        },
        {
            field: 'userId',
            headerName: "User ID",
            flex: 1
        },
        {
            field: 'createdAt',
            headerName: "Created At",
            flex: 1
        },
        {
            field: 'products',
            headerName: "Number of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        }
    ]
    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='Performance' subTitle='Track Sales Performance'/>
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
                    rows={(data && data.sales) || []}
                    getRowId={(row) => row._id}
                    components={{
                        ColumnMenu: CustomColumnMenu
                    }}
                />
            </Box>
        </Box>

    )
}

export default Performance