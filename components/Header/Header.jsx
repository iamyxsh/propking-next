import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { useRouter } from "next/router"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}))

export default function ButtonAppBar({ reload, setReload }) {
	const classes = useStyles()
	const router = useRouter()

	const [token, setToken] = useState("")

	useEffect(() => {
		setToken(localStorage.getItem("token"))
	}, [reload])

	const handleClick = () => {
		if (token) {
			setToken("")
			setReload(!reload)
			localStorage.removeItem("token")
		} else {
			router.push("/")
		}
	}

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						onClick={() => router.push("/home")}
						variant="h6"
						className={classes.title}
						style={{
							cursor: "pointer",
						}}
					>
						PropKing
					</Typography>
					<Button onClick={handleClick} color="inherit">
						{token ? "Logout" : "Login"}
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}
