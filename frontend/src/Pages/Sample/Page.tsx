interface Props {
	title: string;
	content: string;
}

export default function Page(props: Props) {
	return (
		<div className="m-auto">
			<h1 className="text-4xl font-bold">{props.title}</h1>
			<p>
				{props.content}
			</p>
		</div>
	)
}
