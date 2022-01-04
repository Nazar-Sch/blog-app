import React from 'react';
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import ClearIcon from '@mui/icons-material/Clear';
import ChipInput from 'material-ui-chip-input';
import { Chips } from '../Chips';
import { ChipData } from '../Chips/Chips';

interface SearchProps {
  open: boolean;
  handleClear: VoidFunction;
  valueSearch: string;
  handleChangeSearch: (e: any) => void;
  handleSearch: VoidFunction;
  tags: ChipData[];
  tagLabel: ChipData['label'];
  handleAddTags: (tag: string) => void;
  handleDelete: (tag: ChipData) => void;
  handleAddChipts: () => void;
  handleChangeChipLabel: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiContainer-root': {
      display: 'flex',
      marginTop: theme.spacing(2),
      alignItems: 'center',
    },
  },
}));

export const Search: React.FC<SearchProps> = ({
  open,
  handleClear,
  handleChangeSearch,
  valueSearch,
  handleSearch,
  tags,
  tagLabel,
  handleAddTags,
  handleDelete,
  handleAddChipts,
  handleChangeChipLabel,
}) => {
  const classes = useStyles();

  if (!open) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Container>
        <TextField
          variant='standard'
          label='Search by title'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChangeSearch}
          value={valueSearch}
        />
        <Chips
          tags={tags}
          tagLabel={tagLabel}
          handleDelete={handleDelete}
          handleAddChipts={handleAddChipts}
          handleChangeChipLabel={handleChangeChipLabel}
        />
        <Button variant='text' onClick={handleSearch}>
          Search
        </Button>
      </Container>
    </div>
  );
};
