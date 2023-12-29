import styles from "./styles";
import React from "react";
import { BadInput } from "./BadInput";
import { Label } from "./Label";
import { FormControl, Input, InputField } from "@gluestack-ui/themed";
export const NameInput = (props: {
	name: string | undefined;
	isInvalid: boolean | undefined;
	setName: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText='Imię' />
			<Input style={styles.inputFields}>
				<InputField
					type='text'
					value={props.name}
					placeholder='Adam'
					onChangeText={(actualName) => {
						props.setName(actualName);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<BadInput hintText='Wprowadzone imię jest nieprawidłowe!' />
		</FormControl>
	);
};
