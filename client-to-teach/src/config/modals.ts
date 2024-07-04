export const MODAL_BODY_TYPES = {
	TEMP: 'TEMP',
	DEFAULT: '',
};

export type ModalBodyTypes = keyof typeof MODAL_BODY_TYPES;

export const MODAL_SIZES = {
	SM: 'sm',
	LG: 'lg',
};

// type maping to the modal body type and the extra object that the modal body needs
export type ExtraObjectModalMap = {
	TEMP: { message: string };
	DEFAULT: null;
};
