import React from "react";
import styles from "./styles";
import { BadInput } from "./BadInput";
import { Label } from "./Label";
import { FormControl, Input, InputField } from "@gluestack-ui/themed";
export const PasswordInput = (props: {
	password: string | undefined;
	errorText: string | undefined;
	isInvalid: boolean | undefined;
	hintText: string;
	setPassword: (arg0: string) => void;
}) => {
	return (
		<FormControl
			size='lg'
			isDisabled={false}
			isInvalid={props.isInvalid}
			isReadOnly={false}
			isRequired={false}>
			<Label hintText={props.hintText} />
			<Input style={styles.inputFields}>
				<InputField
					type='password'
					placeholder='********'
					value={props.password}
					onChangeText={(actualPassword) => {
						props.setPassword(actualPassword);
					}}
					selectionColor={"black"}
				/>
			</Input>
			<BadInput hintText={props.errorText} />
		</FormControl>
	);
};
