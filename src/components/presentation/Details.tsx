interface DetailsProps {
    number: string;
    title: string;
    description: string;
}

export default function Details({ number, title, description }: DetailsProps) {
    return (
        <div className="flex flex-row gap-8">
            <p className="text-purple-linear text-5xl font-semibold">{number}</p>
            <div className="flex flex-col gap-3">
                <h2 className="font-bold text-white">{title}</h2>
                <p className="font-normal text-xl text-white">{description}</p>
            </div>
        </div>
    );
}
