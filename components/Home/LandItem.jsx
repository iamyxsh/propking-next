import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import Edit from "./Edit"
import fetchCall from "../../utils/fetchCall"

const useStyles = makeStyles({
	root: {
		width: "15rem",
		height: "25rem",
		margin: "1rem",
		position: "relative",
	},
	media: {
		height: 140,
	},
})

export default function LandItem({
	land: { _id, name, city, state, country },
	setFlag,
	flag,
	reload,
	setReload,
}) {
	const classes = useStyles()

	const [edit, setEdit] = useState(false)
	const [token, setToken] = useState("")
	const [err, setErr] = useState("")

	useEffect(() => {
		setToken(localStorage.getItem("token"))
	}, [reload])

	useEffect(() => {
		setFlag(edit)
	}, [edit])

	const handleDelete = async () => {
		if (!token) {
			setErr("Unauthorized Acess. Please login.")
			setTimeout(() => {
				setErr("")
			}, 5000)
		} else {
			const res = await fetchCall(`land/${_id}`, "DELETE", token)
			if (res.status === "fail") {
				setErr("Unauthorized Acess. Please login.")
				setTimeout(() => {
					setErr("")
				}, 5000)
			} else {
				setErr("")
				setFlag(!flag)
				setEdit(false)
			}
		}
	}

	return (
		<>
			<Card className={classes.root}>
				<CardActionArea>
					<CardMedia
						className={classes.media}
						image={`https://source.unsplash.com/random?house,${Math.random()}`}
						title="Real Estate"
					/>
					<CardContent style={{ height: "12rem" }}>
						<Typography gutterBottom variant="h5" component="h2">
							{name}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{city}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{state}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{country}
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							style={{ display: err ? "block" : "none", color: "red" }}
						>
							{err}
						</Typography>
					</CardContent>
				</CardActionArea>
				<CardActions>
					<Button
						style={{
							position: "absolute",
							bottom: 0,
							marginBottom: "1rem",
						}}
						size="small"
						color="primary"
						onClick={() => setEdit(true)}
					>
						Edit
					</Button>
					<Button
						style={{
							position: "absolute",
							bottom: 0,
							left: "20%",
							marginBottom: "1rem",
						}}
						size="small"
						color="secondary"
						onClick={handleDelete}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
			<Edit
				id={_id}
				edit={edit}
				setEdit={(val) => setEdit(val)}
				initName={name}
			/>
		</>
	)
}
