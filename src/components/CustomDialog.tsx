import { forwardRef, ReactElement } from 'react';

interface CustomDialogProps {
  title?: string;
  subtitle?: string;
  children?: ReactElement;
  onClose: () => void;
}

const CustomDialog = forwardRef<HTMLDialogElement, CustomDialogProps>(
  ({ children, onClose, title, subtitle }, ref) => {
    const wrappedChildren = <div data-testid="dog-grid-card-match">{children}</div>;

    return (
      <dialog ref={ref} data-testid="dog-popup">
        <div className="dark:bg-[#1e1f23] dark:text-white  relative w-[100%] md:w-[700px] flex flex-col items-center justify-center p-5">
          {title && <h3 className="text-2xl mb-4 font-bold">{title}</h3>}
          {subtitle && <p className="text-lg mb-5">{subtitle}</p>}
          <div data-testid="dog-grid-card-match">{wrappedChildren}</div>
          <button data-testid="dog-button-close-popup" className="absolute top-[15px] right-[35px]" onClick={onClose}>
            <span className="material-symbols-outlined absolute cursor pointer bg-white bg-opacity-10">
              close
            </span>
          </button>
        </div>
      </dialog>
    );
  }
);

CustomDialog.displayName = 'CustomDialog';

export default CustomDialog;