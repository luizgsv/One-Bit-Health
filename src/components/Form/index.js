import React, { useState } from 'react';
import { Keyboard, Pressable, Text, TextInput, TouchableOpacity, Vibration, View  } from 'react-native';
import ResultImc from './Imc';
import styles from './style';

export default function Form() {

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [imc, setImc] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const msg = imc ? 'Seu imc é igual:' : 'Preencha o peso e altura';
  const txtButton = imc ? 'Calcular Novamente' : 'Calcular';

  function imcCalculator() {
    let heightFormat = height.replace(',' , '.');
    return setImc((weight/(height * heightFormat)).toFixed(2));
  }

  function verificationImc() {
    if (imc === null) {
      Vibration.vibrate()
      setErrorMessage('Campo Obrigatório*')
    };
  }

  function validationImc() {
    if (!weight !== null && height !== null) {
      imcCalculator();
      resetInput()
      return;
    }
    verificationImc()
    setImc(null);
  }
  
  function resetInput() {
    setHeight(null);
    setWeight(null);
    setErrorMessage(null);
  }

  return (
    <Pressable 
      onPress={Keyboard.dismiss} 
      style={styles.formContext}
    >
      <View style={styles.form}>
        <Text style={styles.formLabel} >Altura</Text>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <TextInput 
          value={height}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex. 1.75"
          onChangeText={setHeight}
        />

        <Text style={styles.formLabel}>Peso</Text>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

        <TextInput 
          value={weight}
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex. 75.365"
          onChangeText={setWeight}
        />
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={()=> validationImc()} 
        >
          <Text style={styles.textButtonCalculator}>{txtButton}</Text>
        </TouchableOpacity>
          
      </View>
      <ResultImc message={msg} resultImc={imc} />
    </Pressable>
  );
}
