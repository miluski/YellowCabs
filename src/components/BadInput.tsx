import React from "react";
import styles from "./styles";
import { FormControlError, FormControlErrorText } from "@gluestack-ui/themed";
export const BadInput = (props: { hintText: string | undefined }) => {
	return (
		<FormControlError>
			<FormControlErrorText style={styles.formInputErrorLabelText}>
				{props.hintText}
			</FormControlErrorText>
		</FormControlError>
	);
};
