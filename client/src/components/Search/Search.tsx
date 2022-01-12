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
  if (!open) {
    return null;
  }

  return (
    <div>
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
        <Button
          variant='outlined'
          color='secondary'
          onClick={handleSearch}
        >
          Search
        </Button>
      </Container>
    </div>
  );
};
