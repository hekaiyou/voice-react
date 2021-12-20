import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <div>
        <ListItem button component={Link} to="/">
            <ListItemIcon>
                <FilterTiltShiftIcon />
            </ListItemIcon>
            <ListItemText primary="TTS Server" />
        </ListItem>
        <ListItem button component={Link} to="/compose">
            <ListItemIcon>
                <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Composes" />
        </ListItem>
    </div>
);
