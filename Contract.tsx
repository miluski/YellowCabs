import React from "react"
import { Text, View, Button, ButtonText, CalendarDaysIcon, Icon } from "@gluestack-ui/themed"

export const Contract = (props:{contract:any}) => {
    return <View>
        <Text>Z: {props.contract.from} </Text>
        <Text>Do: {props.contract.to} </Text>
        <Text>{props.contract.km}km</Text>
        <Icon as={CalendarDaysIcon}  size="xl" />
        <Button 
            size="md" 
            variant="solid" 
            action="primary" 
            isDisabled={false} 
            isFocusVisible={false} 
        >
          <ButtonText>Odrzuć</ButtonText>
        </Button>
        <Button 
            size="md" 
            variant="solid" 
            action="primary" 
            isDisabled={false} 
            isFocusVisible={false} 
        >
          <ButtonText>Akceptuj</ButtonText>
        </Button>
    </View>
}