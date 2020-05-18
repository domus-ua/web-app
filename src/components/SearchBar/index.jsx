import React from "react";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    cities = [
        { city: 'Aveiro' },
        { city: 'Braga' },
        { city: 'Coimbra' },
        { city: 'Lisboa' },
        { city: 'Porto' },
        { city: 'Viseu' }
    ];

    handleChange() {

    }

    render() {
        return (
            <div className="container">
                <div class="row" style={{marginTop: "50px"}}>
                    <div class="col-sm-4">
                        <h3 style={{color: "#3f51b5"}}>Search house</h3>
                    </div>
                </div>

                <div class="row" style={{marginTop: "20px"}}>
                    <div class="col-sm-4">
                        <TextField id="outlined-basic" label="City" variant="outlined" style={{ width: "100%" }} />
                    </div>
                    <div class="col-sm-2">
                        <TextField id="outlined-basic" label="Min price" variant="outlined" style={{ width: "100%" }} />
                    </div>
                    <div class="col-sm-2">
                        <TextField id="outlined-basic" label="Min max" variant="outlined" style={{ width: "100%" }} />
                    </div>
                    <div class="col-sm-2">
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-outlined-label">Rooms</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={""}
                                onChange={this.handleChange}
                                label="rooms"
                            >   
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div class="col-sm-2">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SearchIcon />}
                            style={{marginTop: "5px"}}
                        >
                            Search
                        </Button>
                    </div>
                </div>

            </div>
        );
    }

}

export default SearchBar;