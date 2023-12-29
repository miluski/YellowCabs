import React from "react";
import styles from "./styles";
import { FormControlLabel, FormControlLabelText, Text } from "@gluestack-ui/themed";
export const Label = (props: { hintText: string }) => {
	return (
		<FormControlLabel mb='$1'>
			<FormControlLabelText style={styles.formInputControlLabelText}>
				<Text>{props.hintText}</Text>
			</FormControlLabelText>
		</FormControlLabel>
	);
};