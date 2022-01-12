import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { IconButton, TextField, Theme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@mui/styles';

export interface ChipData {
  key: string;
  label: string;
}

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface ChipsProps {
  tags: ChipData[];
  tagLabel: ChipData['label'];
  handleDelete: (tag: ChipData) => void;
  handleAddChipts: () => void;
  handleChangeChipLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2)
  },
  chipsWrapper: {
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 800,
    marginTop: theme.spacing(2)
  },
}));

export const Chips: React.FC<ChipsProps> = ({
  tags,
  tagLabel,
  handleDelete,
  handleAddChipts,
  handleChangeChipLabel,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.chipsWrapper}>
        {tags.map(data => (
          <ListItem key={data.key}>
            <Chip label={data.label} onDelete={() => handleDelete(data)} />
          </ListItem>
        ))}
      </div>
      <div className={classes.root}>
        <TextField
          onChange={handleChangeChipLabel}
          value={tagLabel}
          label='Add tags'
          variant='standard'
        />
        <IconButton onClick={handleAddChipts} disabled={!tagLabel.trim()}>
          <AddIcon />
        </IconButton>
      </div>
    </>
  );
};
