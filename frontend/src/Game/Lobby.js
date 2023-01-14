import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function Lobby() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(25)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Paper variant="outlined" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
