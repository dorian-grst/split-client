interface FeatureProps {
    title: string;
    description: string;
    icon: React.ReactElement;
}

export default function Feature({ title, description, icon }: FeatureProps) {
    return (
        <div className="flex max-w-[400px] flex-col flex-wrap items-center justify-start gap-6 rounded-2xl bg-gray-800 p-6">
            <div className="placeholder: h-12 w-12 items-center justify-start rounded-full bg-gray-600 p-3 text-white">{icon}</div>
            <div className="flex flex-col justify-start gap-2">
                <h4 className="mb-1 text-lg font-medium text-white">{title}</h4>
                <p className="text-left text-gray-400">{description}</p>
            </div>
        </div>
    );
}
