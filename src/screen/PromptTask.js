import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';

// null object for any unfilled optional fields
const other = null

const priorities = [
  high = "high",
  medium = "medium",
  low = "low",
  none = other
]

const PromptTask = ({ addTask }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({
    title: "Title",
    description: "Description",
    notes: "Notes",
    // category: placeholders.category,
    // dueDate: other,
    // priority: placeholders.priority
  });

  const set = (name, text) => {
    setInputs({
      ...inputs,
      [name]: text,
    });
  };

  const reset = () => {
    setInputs({
      title: "Title",
      description: "Description",
      notes: "Notes",
    })
  }

  return (
    <View>
      <Modal
        animationType='slide'
        style={styles.centeredView}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => { setModalVisible(!modalVisible); }}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.textStyle}
            placeholder={inputs.title}
            numberOfLines={1}
            clearTextOnFocus={true}
            onChangeText={(text) => set('title', text)}
          />
          <TextInput
            style={styles.textStyle}
            placeholder={inputs.description}
            numberOfLines={3}
            clearTextOnFocus={true}
            onChangeText={(text) => set('description', text)}
          />
          <TextInput
            style={styles.textStyle}
            placeholder={inputs.notes}
            numberOfLines={5}
            clearTextOnFocus={true}
            onChangeText={(text) => set('notes', text)}
          />
          <Button
            style={[styles.button, styles.buttonClose]}
            title='Create'
            onPress={() => {
              addTask(inputs.title, inputs.description, inputs.notes);
              setModalVisible(!modalVisible);
              reset();
            }}
          />
          <Button
            style={[styles.button, styles.buttonClose]}
            title='Close'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
      <Button
        title="Create Task"
        onPress={() => setModalVisible(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PromptTask;