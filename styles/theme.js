import { createMuiTheme } from "@material-ui/core/styles"

const BLUE_LIGHT = "#8ecae6"
const BLUE = "#219ebc"
const BLUE_DEEP = "#006ea6"
const YELLOW = "#ffb703"
const ORANGE = "#fb8500"

const theme = createMuiTheme({
	palette: {
		primary: {
			main: BLUE,
		},
		secondary: {
			main: "#DC143C",
		},
		common: {
			light: BLUE_LIGHT,
			deep: BLUE_DEEP,
			sub: ORANGE,
			main: BLUE,
			yellow: YELLOW,
		},
	},
	typography: {},
	mixins: {},
})

export default theme
