import React from 'react';
import {useState} from "react";
import {Box, FormControl, MenuItem, InputLabel, Select} from "@mui/material";
import OverviewChart from '../../components/OverviewChart'
import Header from "../../components/Header";
export const Overview = () => {
    const [view, setView] = useState('units');

    return (
        <Box m='1.5rem 2.5rem'>
            <Header title='Overview' subTitle='Overall Profits during this year' />
            <Box height='75vh'>
                <FormControl sx={{mt: '1rem'}}>
                    <InputLabel>View</InputLabel>
                    <Select
                        value={view}
                        label='view'
                        onChange={(e) => setView(e.target.value)}>
                        <MenuItem value='sales'>Sales</MenuItem>
                        <MenuItem value='units'>Units</MenuItem>
                    </Select>
                </FormControl>
                <OverviewChart view={view} />
            </Box>
        </Box>
    )
};

export default Overview;