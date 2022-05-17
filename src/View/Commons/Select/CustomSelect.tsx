import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TraitLevel } from "../../../Utils/trait";

export default function CustomSelect({ data, onChange, menuItems, label }) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event);
    };

    return (
        <Box sx={{ minWidth: 120, marginTop: `20px` }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={data}
                    label={label.toUpperCase()}
                    onChange={handleChange}
                    sx={{
                        height: `42px`,
                        textAlign: `left`,
                    }}
                    name={label.toLowerCase()}
                >
                    {menuItems}
                </Select>
            </FormControl>
        </Box>
    );
}
