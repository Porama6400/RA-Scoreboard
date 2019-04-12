import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '80%',
        marginTop: theme.spacing.unit * 2,
        overflowX: 'auto',
    },
    table: {
        minWidth: 'auto',
    },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}

const rows = [
    createData('Timer on in-field referee ', 159, 6.0, 24, 4.0),
    createData('Sound Client', 237, 9.0, 37, 4.3),
    createData('Dark Mode', 262, 16.0, 24, 6.0)
];

function ConfigTable(props) {
    const { classes } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell align="left">Configuation</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="left">{row.calories}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

ConfigTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigTable);