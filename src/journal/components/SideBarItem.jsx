import { TurnedInNot } from '@mui/icons-material';
import {
	Grid,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ id, date, title = '', body, imageUrls = [] }) => {
	const dispatch = useDispatch();
	//* Acortamos el título si es muy largo
	const newTitle = useMemo(() => {
		return title.length > 17 ? title.substring(0, 17) + '...' : title;
	});

	const onActiveNote = () => {
		dispatch(setActiveNote({ title, body, id, date, imageUrls }));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={onActiveNote}>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
