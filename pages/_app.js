// function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

// export default MyApp

import React, { useState } from "react"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import theme from "../styles/theme"
import "../styles/globals.css"

import Header from "../components/Header/Header"

export default function MyApp(props) {
	const { Component, pageProps } = props

	const [reload, setReload] = useState(false)

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side")
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<React.Fragment>
			<Head>
				<title>PropKing</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header reload={reload} setReload={(val) => setReload(val)} />
				<Component
					setReload={(val) => setReload(val)}
					reload={reload}
					{...pageProps}
				/>
			</ThemeProvider>
		</React.Fragment>
	)
}
