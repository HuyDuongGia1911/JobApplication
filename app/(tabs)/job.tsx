import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Job = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Job</Text>
      </View>
    </View>
  )
}

export default Job

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9FB',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
