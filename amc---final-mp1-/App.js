import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  StyleSheet,
  Button,
} from 'react-native';

const App = () => {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('F');
  const [backgroundImage, setBackgroundImage] = useState(
    require('./assets/snow.jpg')
  ); // Default background image

  const handleTemperatureChange = (text) => {
    setTemperature(text);
    if (scale === 'F') {
      setBackgroundImage(
        text >= 32 ? require('./assets/sun.jpg') : require('./assets/snow.jpg')
      );
    } else {
      setBackgroundImage(
        text >= 0 ? require('./assets/sun.jpg') : require('./assets/snow.jpg')
      );
    }
  };

 const convertTemperature = () => {
  const temperatureValue = parseFloat(temperature);
  
  if (isNaN(temperatureValue)) {
    return 0;
  }

  if (scale === 'F') {
    return ((temperatureValue - 32) * 5) / 9;
  } else {
    return (temperatureValue * 9) / 5 + 32;
  }
};

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleTemperatureChange}
          value={temperature}
          keyboardType="numeric"
          placeholder="Enter temperature"
        />
        <View style={styles.result}>
          <Text style={styles.temperature}>
            {scale === 'F'}
            {convertTemperature().toFixed(2)}
            {scale === 'F' ? ' ℃' : ' ℉'}
          </Text>
        </View>

        <View style={styles.scaleSwitchContainer}>
          <Button
            onPress={() => setScale('F')}
            title="Switch to ℃"
            color="blue"
          />
          <Button
            onPress={() => setScale('C')}
            title="Switch to ℉"
            color="orange"
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    textAlign: 'center',
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 200,
  },
  temperature: {
    fontSize: 80,
    fontWeight: 'bold',
    marginLeft: 10,
    top: 50,
  },
  scaleSwitchContainer: {
    flexDirection: 'row',
    marginTop: 10, 
    marginBottom: 20,
    width: '80%',
    bottom: 100,
    borderRadius: 10,
  },
});

export default App;
