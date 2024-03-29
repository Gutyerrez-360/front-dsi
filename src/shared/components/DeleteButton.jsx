import {DeleteOutline} from "@mui/icons-material";
import {Button} from "@mui/material";

export const DeleteButton = ({ action, disabled }) => (
    <Button
        variant="contained"
        color="error"
        type="button"
        disabled={disabled}
        onClick={action}
    >
        <DeleteOutline color="action" />
    </Button>

)