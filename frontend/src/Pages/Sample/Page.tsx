interface Props {
	title: string;
	content: string;
}

export default function Page(props: Props) {
	return (
		<div className="m-auto p-4">
			<h1 className="text-4xl font-bold">{props.title}</h1>
			<p className="mt-4">
				{props.content}
			</p>
		</div>
	)
}
