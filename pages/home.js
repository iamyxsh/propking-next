import React, { useState, useEffect } from "react"
import fetchCall from "../utils/fetchCall"

import { Grid, makeStyles, Typography } from "@material-ui/core"
import LandItem from "../components/Home/LandItem"
import AddLand from "../components/Home/AddLand"

const useStyles = makeStyles((theme) => ({
	add: {
		position: "fixed",
		bottom: "10vh",
		right: "5vw",
		backgroundColor: theme.palette.primary,
	},
}))

const Home = () => {
	const classes = useStyles()

	const [lands, setLands] = useState([])
	const [flag, setFlag] = useState(false)

	useEffect(() => {
		const getLands = async () => {
			const land = await fetchCall("land", "GET")
			setLands(land)
			localStorage.setItem("flag", false)
		}

		getLands()
	}, [flag])

	return (
		<Grid
			container
			justify="center"
			alignItems="center"
			style={{ minHeight: "100vh", position: "relative" }}
		>
			{lands.length > 0 ? (
				lands.map((land, ind) => (
					<Grid item key={ind}>
						<LandItem land={land} setFlag={(val) => setFlag(val)} flag={flag} />
					</Grid>
				))
			) : (
				<Typography variant="h3">
					Opps, no properties yet. Add some properties.
				</Typography>
			)}
			<div className={classes.add}>
				<AddLand setFlag={(val) => setFlag(val)} flag={flag} />
			</div>
		</Grid>
	)
}

export default Home
