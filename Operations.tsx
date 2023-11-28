import React from 'react';
import { Text } from 'react-native';
import styles from './styles';
import { ScrollView, View } from '@gluestack-ui/themed';

const Operations = () => {
  //TODO: Backend z bazy (JSON pobierany za pomoca get z bazy)
  const operationsData = [
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' },
    { date: '25-11-2023', cost: '12.14zł' },
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' },
    { date: '25-11-2023', cost: '12.14zł' },
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' },
    { date: '25-11-2023', cost: '12.14zł' },
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' },
    { date: '25-11-2023', cost: '12.14zł' },
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' },
    { date: '25-11-2023', cost: '12.14zł' },
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' }
  ];

  return (
    <>
      {operationsData.map((operation, index) => (
          <Text key={index} style={styles.singleOperation}>
            Przejazd {operation.date}   {operation.cost}
          </Text>
      ))}
    </>
  );
};

export default Operations;