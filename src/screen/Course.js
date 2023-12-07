import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ScrollView, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig'; // Import Firebase config
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';


export var categories = [
  {'label': 'All', 'value': 'All'}
];

//TODO - prompt for more details and customize course colors
const PromptCourse = ({ addCourse }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [inputs, setInputs] = useState({});
  // const [startTime, setStart] = useState(new Date('12:00'));
  // const [endTime, setEnd] = useState(new Date('0:00'));

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
            placeholder="Course Title"
            onChangeText={(text) => set('title', text)}
          />
          {/* <TextInput
            style={styles.textStyle}
            placeholder="Professor"
            onChangeText={(text) => set('professor', text)}
          />
          <DateTimePicker
            value={startTime}
            mode='time'
            onChange={setStart}
          />
          <DateTimePicker
            value={endTime}
            mode='time'
            onChange={setEnd}
  /> */}
          <Button
            style={[styles.button, styles.buttonClose]}
            title='Add'
            onPress={() => {
              if(!inputs.title)
                inputs.title = "Untitled Course";
              addCourse(inputs.title);
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
        title="Create Course"
        onPress={() => {setModalVisible(true); reset();}}
      />
    </View>
  )
}

const CreateCourse = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  //TODO - NOT YET IMPLEMENTED
  //save current for  cancelling edits
  const saveProps = props;
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
          <Text style={styles.taskTitle}>{props.title}</Text>
          <Button 
            title='Close'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
      <TouchableOpacity 
        style={styles.course}
        onPress={() => setModalVisible(true)}
      >
          <Text>{props.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function Course() {
  const [courses, setCourse] = useState([]);
  const user = FIREBASE_AUTH.currentUser;
  useEffect(() => {
    // Fetch courses when the component mounts
    const fetchCourses = async () => {
      if (user) {
        const userRef = doc(FIRESTORE_DB, 'users', user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setCourse(docSnap.data().courses || []);
        }
      }
    };

    fetchCourses();
  }, []);


  const addCourse = async (title) => {
    course = {'label': title, 'value': title};
    setCourse([...courses, course]);
    categories.push(course);

    if (user) {
      const userRef = doc(FIRESTORE_DB, 'users', user.uid);
      await updateDoc(userRef, {
        courses: arrayUnion(course)
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredContent}>
        <StatusBar style="auto" />
        <PromptCourse addCourse={addCourse} />
        <ScrollView>
          {courses.map((course, key) => (
            <CreateCourse
              key={key}
              title={course['label']}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  course: {
    backgroundColor: '#dc143c',
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 25,
  },
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