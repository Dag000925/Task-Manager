import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SearchBar } from 'react-native-elements';


export default function Event() {
  const [modalVisible, setModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
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

  const handleInputChange = (key, value) => {
    setEventInfo({ ...eventInfo, [key]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEventInfo({ ...eventInfo, dueDate: selectedDate });
    }
  };

  const createEvent = () => {
    if (eventInfo.title.trim() === '') {
      alert('Please enter a title for the event.');
      return;
    }

    const newEvent = { ...eventInfo, id: events.length + 1 };

    // Find the index to insert the new event based on the due date
    const insertIndex = events.findIndex((event) => event.dueDate > newEvent.dueDate);

    if (insertIndex === -1) {
      // If no event with a later due date is found, insert at the end
      setEvents([...events, newEvent]);
    } else {
      // Insert the new event at the correct position
      setEvents([
        ...events.slice(0, insertIndex),
        newEvent,
        ...events.slice(insertIndex),
      ]);
    }
    setEventInfo({ title: '', description: '', notes: '', dueDate: new Date() });
    setModalVisible(false);
  };

  const EventItem = ({ title, description, notes, dueDate }) => (
  
    <TouchableOpacity
      style={styles.event}
      onPress={() => {
        setSelectedEvent({ title, description, notes, dueDate });
        setEventDetailsModalVisible(true);
      }}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        placeholder="Find Event"
        placeholderTextColor="grey"
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        containerStyle={styles.searchBarContainer} 
      />
      {/* Create Event Button */}
      <TouchableOpacity
        style={[styles.createEventButton, { backgroundColor: '#9370db' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createEventButtonText}>Create Event</Text>
      </TouchableOpacity>

      {/* Create Event Modal */}
      <Modal
        animationType='slide'
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
            placeholderTextColor = "black"
            onChangeText={(text) => handleInputChange('title', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor = "black"
            onChangeText={(text) => handleInputChange('description', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            placeholderTextColor = "black"
            onChangeText={(text) => handleInputChange('notes', text)}
          />
          {/* Date Picker */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.datePickerText}>Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={eventInfo.dueDate}
              mode='datetime'
              onChange={handleDateChange}
            />
          )}
          {/* Create button */}
          <Button title='Create' onPress={createEvent} />
          {/* Cancel button */}
          <Button title='Cancel' onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        animationType='slide'
        style={styles.centeredView}
        transparent={true}
        visible={eventDetailsModalVisible}
        onRequestClose={() => setEventDetailsModalVisible(false)}
      >
        <View style={[styles.modalView, { backgroundColor: 'white', marginTop: 100 }]}>
          <Text style={[styles.modalTitle,{ color: 'black', fontWeight: 'bold' }]}>{selectedEvent ? selectedEvent.title: 'Event Details'}</Text>
          {selectedEvent && (
            <View>
              <Text style={styles.modalText}>{selectedEvent.description}</Text>
              <Text style={styles.modalText}>{selectedEvent.notes}</Text>
              <Text style={styles.modalText}>Date: {selectedEvent.dueDate.toLocaleDateString()} {selectedEvent.dueDate.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}</Text>
            </View>
          )}
          <Button title='Close' onPress={() => setEventDetailsModalVisible(false)} />
        </View>
      </Modal>

      {/* Event List */}
      <ScrollView>
        {events
        .filter((event) => event.title.toLowerCase().includes(searchText.toLowerCase()))
        .map((event, key) => (
          <EventItem key={key} {...event} />
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
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
    alignItems: 'flex-start',
    marginTop: 2,
    borderRadius: 8,
    backgroundColor: 'grey',
    borderRadius: 20, 
    backgroundColor: 'lightgrey',
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
  event: {
    backgroundColor: '#dc143c',
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 10, 
  },
  searchBarContainer: {
    height: 60,
    width: '100%',
    backgroundColor: '#262524',
    borderTopWidth: 0,
  },
});