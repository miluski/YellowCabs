import styles from "./styles";
import React from "react";
import { BadInput } from "./BadInput";
import { Label } from "./Label";
import { FormControl, Input, InputField } from "@gluestack-ui/themed";
export const SurnameInput = (props: {
	surname: string | undefined;
	isInvalid: boolean | undefined;
	setSurname: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText='Nazwisko' />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					value={props.surname}
					placeholder='Kielecki'
					onChangeText={(actualSurname) => {
						props.setSurname(actualSurname);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<BadInput hintText='Wprowadzone nazwisko jest nieprawidłowe!' />
		</FormControl>
	);
};
