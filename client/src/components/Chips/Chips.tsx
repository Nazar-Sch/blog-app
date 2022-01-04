import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

export const Chips: React.FC<ChipsProps> = ({
  tags,
  tagLabel,
  handleDelete,
  handleAddChipts,
  handleChangeChipLabel,
}) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component='ul'
    >
      {tags.map(data => {
        return (
          <ListItem key={data.key}>
            <Chip label={data.label} onDelete={() => handleDelete(data)} />
          </ListItem>
        );
      })}
      <TextField
        onChange={handleChangeChipLabel}
        value={tagLabel}
        variant='standard'
        placeholder='Type tags for search'
      />
      <IconButton onClick={handleAddChipts} disabled={!tagLabel.trim()}>
        <AddIcon />
      </IconButton>
    </Paper>
  );
};
