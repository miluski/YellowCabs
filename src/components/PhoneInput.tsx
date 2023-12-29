import React from "react";
import styles from "./styles";
import { BadInput } from "./BadInput";
import { Label } from "./Label";
import { FormControl, Input, InputField } from "@gluestack-ui/themed";
export const PhoneInput = (props: {
	phoneNumber: string | undefined;
	errorMessage: string | undefined;
	isInvalid: boolean | undefined;
	value: string | undefined;
	setPhoneNumber: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText='Numer telefonu' />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					value={props.phoneNumber}
					placeholder='123123123'
					onChangeText={(actualPhoneNumber) => {
						props.setPhoneNumber(actualPhoneNumber);
					}}
					selectionColor={"black"}
					keyboardType='numeric'
					defaultValue={props.value}
				/>
			</Input>
			<BadInput hintText={props.errorMessage} />
		</FormControl>
	);
};