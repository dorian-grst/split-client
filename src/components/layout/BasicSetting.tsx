interface InputGroupModalProps {
    title: string;
    rule?: string;
    children?: React.ReactNode;
    textButton: string;
    borderColor?: string;
    buttonColor?: string;
    backgroundColor?: string;
}

export default function BasicSetting({ title, rule, children, textButton, borderColor, buttonColor, backgroundColor }: InputGroupModalProps) {
    return (
        <div className={`flex h-min w-full flex-col rounded-lg border ${borderColor ? borderColor : 'border-light-gray'}`}>
            <div className={`flex flex-col gap-[10px] rounded-t-lg border-b p-10 ${borderColor ? borderColor : 'border-light-gray'}`}>
                <h3 className="font-semibold text-black">{title}</h3>
                {children}
            </div>
            <div className={`flex flex-row items-center justify-between rounded-b-lg p-8 ${backgroundColor}`}>
                <p>{rule}</p>
                <button className={`next ${buttonColor}`}>{textButton}</button>
            </div>
        </div>
    );
}
