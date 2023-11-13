import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const priorities = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const categories = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const PromptTask = ({ addTask }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({});

  const set = (name, text) => {
    setInputs({
      ...inputs,
      [name]: text,
    });
  };

  const reset = () => {
    setInputs({});
  }

  return (
    <View>
      <Modal
        animationType='slide'
        style={styles.centeredView}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible);}}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.textStyle}
            placeholder="Title"
            numberOfLines={1}
            clearTextOnFocus={true}
            onChangeText={(text) => set('title', text)}
          />
          <TextInput
            style={styles.textStyle}
            placeholder="Description"
            numberOfLines={3}
            clearTextOnFocus={true}
            onChangeText={(text) => set('description', text)}
          />
          <TextInput
            style={styles.textStyle}
            placeholder="Notes"
            numberOfLines={5}
            clearTextOnFocus={true}
            onChangeText={(text) => set('notes', text)}
          />
          <View style={{width: '75%'}}>
            <Dropdown 
              style={styles.dropdown}
              data={priorities}
              //search
              labelField="label"
              valueField="value"
              placeholder={'Select priority'}
              searchPlaceholder="Search..."
              maxHeight={300}
              onChange={item => {
                set('priority', item.value);
              }}
            />
          </View>
          <View style={{width: '75%'}}>
            <Dropdown 
              style={styles.dropdown}
              data={categories}
              search
              labelField="label"
              valueField="value"
              placeholder={'Select category'}
              searchPlaceholder="Search..."
              maxHeight={300}
              onChange={item => {
                set('category', item.value);
              }}
            />
          </View>
          <Button
            style={[styles.button, styles.buttonClose]}
            title='Create'
            onPress={() => {
              if(!inputs.title)
                inputs.title = "Untitled Task";
              addTask(
                inputs.title, 
                inputs.description, 
                inputs.notes, 
                inputs.priority,
                inputs.category
              );
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
  dropdown: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
});

export default PromptTask;