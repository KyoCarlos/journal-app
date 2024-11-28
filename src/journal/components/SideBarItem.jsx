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

export const SideBarItem = ({ note }) => {
	const dispatch = useDispatch();
	//* Acortamos el título si es muy largo
	const newTitle = useMemo(() => {
		return note.title.length > 17
			? note.title.substring(0, 17) + '...'
			: note.title;
	});

	const onActiveNote = () => {
		dispatch(setActiveNote(note));
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={onActiveNote}>
				<ListItemIcon>
					<TurnedInNot />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={note.body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
