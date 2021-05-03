import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { makeStyles } from "@material-ui/core/styles"
import {
	Container,
	Typography,
	TextField,
	CssBaseline,
	Button,
	Grid,
} from "@material-ui/core"

import Alert from "@material-ui/lab/Alert"
import fetchCall from "../utils/fetchCall"

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

export default function SignIn({ setReload, reload }) {
	const classes = useStyles()
	const router = useRouter()

	const [email, setEmail] = useState("")
	const [password, setPass] = useState("")
	const [err, setErr] = useState("")

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			router.push("/home")
		}
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		const token = await fetchCall("admin/signin", "POST", null, {
			email,
			password,
		})

		if (!token.token) {
			setErr(token.payload)
			setTimeout(() => {
				setErr("")
			}, 5000)
		} else {
			localStorage.setItem("token", token.token)
			setReload(!reload)
			router.push("/home")
		}
	}

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<Grid container spacing="2" direction="column" className={classes.paper}>
				<Grid item>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
				</Grid>
				<Grid item>
					<Alert severity="info">
						Put email = iamyxsh@gmail.com and password = password
					</Alert>
				</Grid>
				<Grid item style={{ display: err ? "block" : "none" }}>
					<Alert severity="error">{err}</Alert>
				</Grid>
				<Grid item>
					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPass(e.target.value)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={(e) => handleSubmit(e)}
						>
							Sign In
						</Button>
					</form>
				</Grid>
				<Grid item>
					<Typography
						style={{ fontSize: "1.5rem", color: "#219EBC", cursor: "pointer" }}
						onClick={() => router.push("/home")}
						variant="subtitle1"
					>
						List Properties
					</Typography>
				</Grid>
			</Grid>
		</Container>
	)
}
