import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function CategoryDropDown(props) {
    const [category, setCategory] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    console.log(props);
    setCategory(props.category) 
  },[])
  

  return (
    <div>
      {category.map(cat => 
            <Button
            id="basic-button"
            aria-controls={props.open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={props.open ? 'true' : undefined}
            onClick={props.handleClick}
          >{cat.categoryName}
          </Button>
      )}
      <Menu
        id="basic-menu"
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={props.handleClose}></MenuItem>
      </Menu>
    </div>
  );
}