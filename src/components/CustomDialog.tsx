import React, { forwardRef } from 'react';

interface CustomDialogProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const CustomDialog = forwardRef<HTMLDialogElement, CustomDialogProps>(({ children, onClose, title, subtitle }, ref) => (
    <dialog ref={ref}>
        <div className="relative w-[700px] flex flex-col items-center justify-center p-5">
            {title && <h3 className="text-2xl mb-4 font-bold">{title}</h3>}
            {subtitle && <p className="text-lg mb-5">{subtitle}</p>}
            {children}
            <button className="absolute top-[15px] right-[35px]" onClick={onClose}>
                <span className="material-symbols-outlined absolute cursor pointer bg-white bg-opacity-10">
                    close
                </span>
            </button>
        </div>
    </dialog>
));

CustomDialog.displayName = 'CustomDialog';

export default CustomDialog;