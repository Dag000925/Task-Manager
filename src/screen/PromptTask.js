import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { categories } from './Course';

const priorities = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const PromptTask = ({ addTask }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({
    'dueDate': new Date()
  });

  const set = (name, text) => {
    setInputs({
      ...inputs,
      [name]: text,
    });
  };

  const [date, setDate] = useState(new Date());

  const onChange = (event, date) => {
    setDate(date);
    set('dueDate', date);
  }

  const reset = () => {
    now = new Date();
    setInputs({'dueDate': now});
    setDate(now);
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
            onChangeText={(text) => set('title', text)}
          />
          <TextInput
            style={styles.textStyle}
            placeholder="Description"
            onChangeText={(text) => set('description', text)}
          />
          <TextInput
            style={styles.textStyle}
            placeholder="Notes"
            onChangeText={(text) => set('notes', text)}
          />
          <View style={{width: '75%'}}>
            <Dropdown 
              style={styles.dropdown}
              data={priorities}
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
              search={categories.length}
              labelField="label"
              valueField="value"
              placeholder={categories.length ? 'Select course' : 'No courses'}
              searchPlaceholder="Search..."
              maxHeight={300}
              onChange={item => {
                set('category', item.value);
              }}
            />
          </View>
          <DateTimePicker
            value={date}
            mode='datetime'
            onChange={onChange}
          />
          <Button
            style={[styles.button, styles.buttonClose]}
            title='Create'
            onPress={() => {
              if(!inputs.title)
                inputs.title = "Untitled Task";
              if(!inputs.priority)
                inputs.priority = "none"
              addTask(
                inputs.title, 
                inputs.description, 
                inputs.notes, 
                inputs.priority,
                inputs.category,
                inputs.dueDate.valueOf()
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
        onPress={() => {setModalVisible(true); reset();}}
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