require('./App.css')

const React = require('react')

const { Route, Link, Switch, Redirect } = require('react-router-dom')

export default () => {
  	return (
		<div>
			<div
				className = "nav-bar-container"
			>
				<Link
					className = "nav-bar-link"
					to = "/"
				>
					<h2
						className = "nav-bar-title"
					>
						My Website
					</h2>
				</Link>

				<Link
					className = "nav-bar-link"
					to = "/messages"
				>
					<h4
						className = "nav-bar-title"
					>
						Messages
					</h4>
				</Link>
			</div>

			<div
				className = "content-container"
			>
				<Switch>
					<Route
						exact
						path = "/"
						component={Home}
					/>

					<Route
						path = "/messages"
						component = {Messages}
					/>

					<Redirect
						to = "/"
					/>
				</Switch>
			</div>
		</div>
  	)
}

const Home = () => {
	return (
		<p
			className = "content-container-paragraph"
		>
			Home
		</p>
	)
}

const Messages = ({ match }) => {
	const messages = [
		{
			id: 0,
			message: "Selamat pagi"
		},
		{
			id: 1,
			message: "Selamat malam"
		}
	]

	return (
		<div>
			<p
				className = "content-container-paragraph"
			>
				Messages
			</p>

			<Switch>
				<Route
					path = {`${match.url}/:id(\\d+)`}
					component = {props => (
						<Message
							{...props}
							messages = {messages}	
						/>
					)}
				/>

				<Route
					path = {match.url}
					render = {() => <h3>Please select a message</h3>}
				/>
			</Switch>

			{
				messages.map(n => {
					return (
						<p
							key = {n.id}
						>
							<Link
								to = {`${match.url}/${n.id}`}
							>
								{n.message}
							</Link>
						</p>
					)
				})
			}
		</div>
	)
}

const Message = (props) => {
	let value = ""

	for(const message of props.messages) {
		if(Number(message.id) === Number(props.match.params.id)) {
			value = message.message

			break
		}
	}

	return (
		<h3>Message with ID {props.match.params.id} and value {value}</h3>
	)
}