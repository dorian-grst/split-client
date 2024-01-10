import React from 'react';

interface InputGroupModalProps {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    name?: string;
    onChange?: (value: string) => void;
}

export default function InputGroupModal({ label, placeholder, type, value, name, onChange }: InputGroupModalProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-gray-950">{label}</p>
            <input placeholder={placeholder} name={name} value={value} type={type} onChange={handleChange} className="form-input" />
        </div>
    );
}
