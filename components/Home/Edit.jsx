import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import fetchCall from "../../utils/fetchCall"
import Alert from "@material-ui/lab/Alert"

export default function Edit({ edit, setEdit, id, initName }) {
	const token = localStorage.getItem("token")

	const [err, setErr] = useState("")
	const [name, setName] = useState(initName)

	const handleClose = () => {
		setErr("")
		setEdit(false)
	}

	const handleEdit = async () => {
		if (name.length > 30 || name.length < 5) {
			setErr("Name should be b/w 5-30 characters.")
			setTimeout(() => {
				setErr("")
			}, 5000)
		} else {
			const res = await fetchCall(`land/${id}`, "PATCH", token, { name })
			if (res.status === "fail" && res.payload === "Unauthorized Access.") {
				setErr("Unauthorized Access. Please login.")
				setTimeout(() => {
					setErr("")
				}, 5000)
			} else if (res.status === "fail") {
				setErr("Name must be unique.")
				setTimeout(() => {
					setErr("")
				}, 5000)
			} else {
				setErr("")
				setEdit(false)
			}
		}
	}

	return (
		<Dialog
			open={edit}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
			maxWidth="sm"
			fullWidth={true}
		>
			<DialogTitle id="form-dialog-title">Edit</DialogTitle>
			<DialogContent>
				<DialogContentText>Edit the name of the property.</DialogContentText>
				<DialogContentText style={{ display: err ? "block" : "none" }}>
					<Alert severity="error">{err}</Alert>
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Name"
					type="text"
					fullWidth
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleEdit} color="primary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	)
}
