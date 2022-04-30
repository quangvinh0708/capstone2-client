import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TraitLevel } from "../../../Utils/trait";

export default function BasicSelect({
    personality,
    handleChangePersonalityLevel,
    p,
}) {
    // const [level, setLevel] = React.useState<TraitLevel>(TraitLevel.HIGH);

    const handleChange = (event: SelectChangeEvent) => {
        console.log("e", event.target.value);
        // setLevel(event.target.value as TraitLevel);
        
        handleChangePersonalityLevel(personality, event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, marginTop: `20px` }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={p[personality] ? p[personality] : TraitLevel.LOW}
                    label="Level"
                    onChange={handleChange}
                    sx={{
                        height: `42px`,
                        textAlign: `left`,
                    }}
                >
                    <MenuItem value={TraitLevel.HIGH}>High</MenuItem>
                    <MenuItem value={TraitLevel.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={TraitLevel.LOW}>Low</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
