import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Operations = () => {
  const operationsData = [
    { date: '23-10-2023', cost: '23.64zł' },
    { date: '24-11-2023', cost: '21.72zł' },
    { date: '25-11-2023', cost: '12.14zł' },
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

const styles = StyleSheet.create({
  singleOperation: {
    fontWeight: 'normal',
    fontSize: 20,
    marginLeft: 5,
    paddingTop: 7,
    color: 'red'
  },
});

export default Operations;