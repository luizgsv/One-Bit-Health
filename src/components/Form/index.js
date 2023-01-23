import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native';

import ResultImc from './Imc';
import styles from './style';

export default function Form() {

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [imc, setImc] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);

  const msg = imc ? 'Seu imc é igual:' : 'Preencha o peso e altura';
  const txtButton = imc ? 'Calcular Novamente' : 'Calcular';

  function imcCalculator() {
    let heightFormat = height.replace(',' , '.');
    let totalImc = (weight/(height * heightFormat)).toFixed(2);
    const miliSeconds = new Date().getTime();
    setImcList((array)=> [...array, {id: miliSeconds, imc: totalImc}]);
    setImc(totalImc);
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
    } else {
      verificationImc()
      setImc(null);
    }
  }
  
  function resetInput() {
    setHeight(null);
    setWeight(null);
    setErrorMessage(null);
    
  }
  
  return (
    <View style={styles.formContext}>
      {imc === null ? (
        <Pressable 
          onPress={Keyboard.dismiss} 
          style={styles.form}
        >
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

        </Pressable>
      ) : (
        <View style={styles.exhibitionResult}>
          <ResultImc message={msg} resultImc={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={()=> validationImc()} 
          >
            <Text style={styles.textButtonCalculator}>{txtButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({item})=> {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}> Resultado do Imc = </Text>
              {item.imc}
            </Text>
          )
        }}
        keyExtractor={(item)=> item.id}
      />
    </View>
  );
}
