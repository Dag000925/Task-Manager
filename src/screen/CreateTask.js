import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from 'react-native-elements';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../FirebaseConfig';
import { updateDoc, getDocs, doc, setDoc, getDoc, arrayUnion } from 'firebase/firestore';
import { onSnapshot, collection } from 'firebase/firestore';

export default function Event() {

  const currentUser = FIREBASE_AUTH.currentUser;

  useEffect(() => {
    const fetchEvents = async () => {
      if (currentUser) {
        const userRef = doc(FIRESTORE_DB, "users", currentUser.uid);
  
        // Optional: Real-time updates using onSnapshot
        const unsubscribe = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const fetchedEvents = doc.data().events || [];
            setEvents(fetchedEvents);
            setIncompleteEvents(fetchedEvents.filter(event => !event.complete));
            setCompleteEvents(fetchedEvents.filter(event => event.complete));
          } else {
            console.log("No such document!");
          }
        });
        return () => unsubscribe();
      }
    };
  
    fetchEvents();
  }, [currentUser]);

  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [incompleteEvents, setIncompleteEvents] = useState([]);
  const [completeEvents, setCompleteEvents] = useState([]);
  const [eventInfo, setEventInfo] = useState({
    title: '',
    description: '',
    notes: '',
    dueDate: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailsModalVisible, setEventDetailsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showIncomplete, setShowIncomplete] = useState(true);

  const handleInputChange = (key, value) => {
    setEventInfo({ ...eventInfo, [key]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      // Check if the selected date is the default date (Jan 01, 1970)
      const isDefaultDate = selectedDate.getTime() === new Date(0).getTime();
  
      if (isDefaultDate) {
        alert('Please select a valid date for the event.');
      } else {
        setEventInfo({ ...eventInfo, dueDate: selectedDate });
      }
    }
  };

  const createEvent = async () => {
    if (eventInfo.title.trim() === '') {
      alert('Please enter a title for the event.');
      return;
    }
    if (!showDatePicker) {
      alert('Please select a date for the event.');
      return;
    }
    //const newEvent = { ...eventInfo, id: events.length + 1, complete: false };
    const newEvent = { ...eventInfo, id: incompleteEvents.length + 1, complete: false };

    if (currentUser) {
      try {
        const userRef = doc(FIRESTORE_DB, "users", currentUser.uid);
        await updateDoc(userRef, {
          events: arrayUnion(newEvent) 
        });
        console.log("Event added to the user's document");
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    } else {
      console.log("No user is logged in");
    }
    

    
    // Add the new event to the incomplete list
    setIncompleteEvents([...incompleteEvents, newEvent]);

    // Save the new event to the database
    //saveEventToDatabase(newEvent);

    // Sort incomplete events by due date
    const sortedIncompleteEvents = [...incompleteEvents, newEvent].sort((a, b) => a.dueDate - b.dueDate);
    setIncompleteEvents(sortedIncompleteEvents);

    setEventInfo({ title: '', description: '', notes: '', dueDate: new Date() });
    setModalVisible(false);
    setShowDatePicker(false);
  };

  // Function to handle event deletion
  const deleteEvent = (event) => {
    // Check if the event is incomplete or complete and update the state accordingly
    if (showIncomplete) {
      const updatedIncompleteEvents = incompleteEvents.filter((e) => e.id !== event.id);
      setIncompleteEvents(updatedIncompleteEvents);
    } else {
      const updatedCompleteEvents = completeEvents.filter((e) => e.id !== event.id);
      setCompleteEvents(updatedCompleteEvents);
    }

    // Delete the event from the database
    //deleteEventFromDatabase(event.id);

    setEventDetailsModalVisible(false);
  };


  const markAsComplete = (event) => {
    // Remove from incomplete list
    const updatedIncompleteEvents = incompleteEvents.filter((e) => e.id !== event.id);
    setIncompleteEvents(updatedIncompleteEvents);

    // Add to complete list
    setCompleteEvents([...completeEvents, event]);

     // Update the event in the database
    //updateEventInDatabase(event.id, { ...event, complete: true });

    setEventDetailsModalVisible(false);
  };

  const EventItem = ({ title, description, notes, dueDate, id }) => {
    const moveEventUp = () => {
      // Move the event up in the list
      // Check if the event is not already at the top
      if (showIncomplete) {
        const index = incompleteEvents.findIndex((event) => event.id === id);
        if (index > 0) {
          const updatedIncompleteEvents = [...incompleteEvents];
          const temp = updatedIncompleteEvents[index];
          updatedIncompleteEvents[index] = updatedIncompleteEvents[index - 1];
          updatedIncompleteEvents[index - 1] = temp;
          setIncompleteEvents(updatedIncompleteEvents);
        }
      }
    };
  
    const moveEventDown = () => {
      // Move the event down in the list
      // Check if the event is not already at the bottom
      if (showIncomplete) {
        const index = incompleteEvents.findIndex((event) => event.id === id);
        if (index < incompleteEvents.length - 1) {
          const updatedIncompleteEvents = [...incompleteEvents];
          const temp = updatedIncompleteEvents[index];
          updatedIncompleteEvents[index] = updatedIncompleteEvents[index + 1];
          updatedIncompleteEvents[index + 1] = temp;
          setIncompleteEvents(updatedIncompleteEvents);
        }
      }
    };
  
    const isTopEvent = showIncomplete && incompleteEvents.findIndex((event) => event.id === id) === 0;
    const isBottomEvent = showIncomplete && incompleteEvents.findIndex((event) => event.id === id) === incompleteEvents.length - 1;
  
    return (
      <TouchableOpacity
        style={[styles.event, showIncomplete ? styles.incompleteEvent : styles.completeEvent]}
        onPress={() => {
          setSelectedEvent({ title, description, notes, dueDate, id });
          setEventDetailsModalVisible(true);
        }}
      >
        <View>
          <Text style={styles.title}>{title}  </Text>
        </View>
        {showIncomplete && (
          <View style={styles.arrowContainer}>
            {!isTopEvent && (
              <TouchableOpacity style={[styles.arrowButton, styles.upArrowBackground]} onPress={moveEventUp}>
                <Text style={styles.arrowText}>↑</Text>
              </TouchableOpacity>
            )}
            {!isBottomEvent && (
              <TouchableOpacity style={[styles.arrowButton, styles.downArrowBackground]} onPress={moveEventDown}>
                <Text style={styles.arrowText}>↓</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        placeholder="Find Event"
        placeholderTextColor="grey"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        containerStyle={{
          width: '100%',
          backgroundColor: '#262524',
          borderTopWidth: 0,
        }}
        inputContainerStyle={{
          height: 30,  
        }}
      />
      {/* Create Event Button */}
      <TouchableOpacity
        style={[styles.createEventButton, { backgroundColor: '#9370db' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createEventButtonText}>Create Event</Text>
      </TouchableOpacity>

      {/* Event List */}
      <ScrollView style={styles.eventList}>
      {showIncomplete
        ? incompleteEvents
            .filter((event) => event.title.toLowerCase().includes(searchText.toLowerCase()))
            .map((event) => <EventItem key={event.id} {...event} />)
        : completeEvents
            .filter((event) => event.title.toLowerCase().includes(searchText.toLowerCase()))
            .map((event) => <EventItem key={event.id} {...event} />)
    }
    </ScrollView>
      {/* Incomplete/Complete Switch */}
      <View style={styles.switchContainer}>
        <TouchableOpacity 
          style={[styles.switchButton, showIncomplete && styles.selectedButton]} 
          onPress={() => setShowIncomplete(true)}
        >
          <Text>Incomplete</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.switchButton, !showIncomplete && styles.selectedButton]}
          onPress={() => setShowIncomplete(false)}
        >
          <Text>Complete</Text>
        </TouchableOpacity>
      </View>

      {/* Create Event Modal */}
      <Modal
        animationType="slide"
        style={styles.centeredView}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Create Event</Text>
          {/* Input fields */}
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="black"
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="black"
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            placeholderTextColor="black"
            onChangeText={(text) => handleInputChange('notes', text)}
          />
          {/* Date Picker */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.datePickerText}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker value={eventInfo.dueDate} mode="datetime" onChange={handleDateChange} />
          )}
          {/* Create button */}
          <Button title="Create" onPress={createEvent} />
          {/* Cancel button */}
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        animationType="slide"
        style={styles.centeredView}
        transparent={true}
        visible={eventDetailsModalVisible}
        onRequestClose={() => setEventDetailsModalVisible(false)}
      >
        <View style={[styles.modalView, { backgroundColor: 'white'}]}>
          <Text style={[styles.modalTitle, { color: 'black', fontWeight: 'bold' }]}>
            {selectedEvent ? selectedEvent.title : 'Event Details'}
          </Text>
          {selectedEvent && (
            <View>
              <Text style={styles.modalText}>{selectedEvent.description}</Text>
              <Text style={styles.modalText}>{selectedEvent.notes}</Text>
              {selectedEvent && selectedEvent.dueDate && typeof selectedEvent.dueDate.toLocaleDateString === 'function' && (
              <Text style={styles.modalText}>
              Date: {selectedEvent.dueDate.toLocaleDateString()}{' '}
              {selectedEvent.dueDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
            </Text>
            )}
              {showIncomplete && (
                <View style={styles.buttonContainer}>
                  <Button title="Complete" onPress={() => markAsComplete(selectedEvent)} />
                </View>
              )}
              <Button title="Delete" onPress={() => deleteEvent(selectedEvent)} />
              <Button title="Close" onPress={() => setEventDetailsModalVisible(false)} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginVertical: '60%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'grey',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'lightgray',
  },
  createEventButton: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: 'lightgrey',
    marginBottom: 10,
  },
  createEventButtonText: {
    color: '#2196F3',
    fontSize: 18,
    fontWeight: 'bold',
  },
  datePickerText: {
    fontSize: 17,
    color: '#2196F3',
    marginTop: 10,
    marginBottom: 20,
  },
  eventList: {
    flex: 1,
    width: '100%',
  },
  event: {
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center', 
  },
  title: {
    color: 'black', 
    fontSize: 18, 
    fontWeight: 'bold',
     textAlign: 'center',
  },
  incompleteEvent: {
    backgroundColor: '#2196F3', //#dc143c 
  },
  completeEvent: {
    backgroundColor: 'green',
  },
  eventText: {
    color: 'black', 
    fontSize: 16,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    height: 50,
    paddingVertical: 10,
    backgroundColor: 'gray',
    borderRadius: 25,
    marginHorizontal: 20
  },
  switchButton: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  selectedButton: {
    backgroundColor: '#585858',
    borderRadius: 25,
  },
  activeLabel: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  switchView: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
  },
  titleContainer: {
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 0, 
    marginRight: 0, 
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,  
    overflow: 'hidden', 
  },
  arrowButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 8,
  },
  arrowBackground: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 8,
    overflow: 'hidden',
  },
  upArrowBackground: {
    backgroundColor: 'green',
  },
  downArrowBackground: {
    backgroundColor: 'red',
  },
  arrowText: {
    fontSize: 24,
    color: 'black',
  },
});
