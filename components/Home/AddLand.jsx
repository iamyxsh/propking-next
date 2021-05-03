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

const AddLand = ({ setFlag, flag }) => {
	const [open, setOpen] = useState(false)
	const [err, setErr] = useState("")
	const [name, setName] = useState("")
	const [area, setArea] = useState("")
	const [state, setState] = useState("")
	const [city, setCity] = useState("")
	const [country, setCountry] = useState("")

	const handleClose = () => {
		setErr("")
		setName("")
		setCity("")
		setState("")
		setCountry("")
		setArea("")
		setOpen(false)
	}

	const handleSubmit = async () => {
		const token = localStorage.getItem("token")

		if (
			name.length > 30 ||
			name.length < 5 ||
			city.length > 30 ||
			city.length < 5 ||
			area.length > 30 ||
			area.length < 5 ||
			state.length > 30 ||
			state.length < 5 ||
			country.length > 30 ||
			country.length < 5
		) {
			setErr("Field values should be b/w 5-30 characters.")
			setTimeout(() => {
				setErr("")
			}, 5000)
		} else {
			const res = await fetchCall(`land`, "POST", token, {
				name,
				area,
				city,
				state,
				country,
			})
			if (res.status === "fail" && res.payload === "Unauthorized Access.") {
				setErr("Unauthorized Access. Please Login.")
				setTimeout(() => {
					setErr("")
				}, 5000)
			} else if (res.status === "fail") {
				setErr("Name should be unique.")
				setTimeout(() => {
					setErr("")
				}, 5000)
			} else {
				setErr("")
				setName("")
				setArea("")
				setState("")
				setCity("")
				setCountry("")
				setFlag(!flag)
				setOpen(false)
			}
		}
	}

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				size="large"
				variant="contained"
				color="primary"
			>
				Add
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				maxWidth="sm"
				fullWidth={true}
			>
				<DialogTitle id="form-dialog-title">Add</DialogTitle>
				<DialogContent>
					<DialogContentText>Add a new property.</DialogContentText>
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
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Area"
						type="text"
						fullWidth
						value={area}
						onChange={(e) => setArea(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="City"
						type="text"
						fullWidth
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="State"
						type="text"
						fullWidth
						value={state}
						onChange={(e) => setState(e.target.value)}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Country"
						type="text"
						fullWidth
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default AddLand
