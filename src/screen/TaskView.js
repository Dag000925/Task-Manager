import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SearchBar } from 'react-native-elements';
import { CheckBox } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { categories } from './Course';

export default function Task() {
  const [tasks, setTask] = useState(new Map());
  const [completeTasks, setCompleteTasks] = useState(new Map());
  const [incompleteTasks, setIncompleteTasks] = useState(tasks);
  const [keyVal, setKeyVal] = useState(0);
  const [search, setSearch] = useState('');
  const [viewedTasks, setViewedTasks] = useState(Array.from(tasks.values()));
  //handle view switching
  const [incompletePressed, setIncompletePressed] = useState(true);
  const [completePressed, setCompletePressed] = useState(false);
  
  const filters = [
    { 'label': 'Title' },
    { 'label': 'Due date' },
    { 'label': 'Priority' },
  ];

  const priorities = [
    { val: 'None' },
    { val: 'High' },
    { val: 'Medium' },
    { val: 'Low' },
  ]

  //DOCS Creating a Task object
  const CreateTask = (props) => {
    //information modal visbility
    const [modalVisible, setModalVisible] = useState(false);
    //editing modal visibility
    const [editing, setEditing] = useState(false);
    //checkbox value
    const [completion, setCompletion] = useState(false);
    //state for props of task
    const [inputs, setInputs] = useState(props);
    //tentative edits for new task
    const [edits, setEdits] = useState(props);

    //determine Task style based on priority
    let p = [styles.item, styles.noPriorityItem];
    const choosePriority = () => {
      //change the task style based on its priority
      if (edits.priority == 'High')
        p = [styles.item, styles.highPriorityItem];
      else if (edits.priority == 'Medium')
        p = [styles.item, styles.mediumPriorityItem];
      else if (edits.priority == 'Low')
        p = [styles.item, styles.lowPriorityItem];
    };
    choosePriority();

    //convert and parse due date
    const due = new Date(props.dueDate);

    //formats a date object into a string without seconds and timezone
    const format = (date) => {
      dtString = date.toDateString() + ", ";
      dtString += (date.getHours() % 12);
      dtString += ":" + date.getMinutes().toString().padStart(2, '0');
      dtString += (date.getHours() > 11 ? "PM" : "AM");
      return dtString;
    }

    //format string for time remaining/overdue of task
    const difference = (time) => {
      days = Math.floor(Math.abs(time / (1000 * 60 * 60 * 24)));
      hours = Math.floor(Math.abs((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      minutes = Math.floor(Math.abs((time % (1000 * 60 * 60)) / (1000 * 60)));
      if (minutes == 0) minutes = 1;
      ret = (time > 0 ? "Time Remaining: " : "Overdue: ");
      ret += (days > 0 ? days + " day(s) " : "");
      ret += (hours > 0 ? hours + " hour(s) " : "");
      ret += (minutes > 0 ? minutes + " minute(s)" : "");
      return ret;
    }

    //save edits until changes are confirmed
    const editProps = (name, text) => {
      setEdits({
        ...edits,
        [name]: text,
      });
    };

    return (
      <View>
        <Modal
          animationType='slide'
          style={styles.centeredView}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => { setModalVisible(!modalVisible); }}
        >
          <View style={[styles.modalView, { alignItems: 'stretch' }]}>
            <Text style={styles.taskCategory}>{inputs.category}</Text>
            <Text style={styles.taskTitle}>{inputs.title}</Text>
            <Text style={styles.taskDescription}>{inputs.description}</Text>
            <Text>{inputs.notes}</Text>
            <Text>Due Date: {format(new Date(inputs.dueDate))}</Text>
            <Text>{difference(new Date(inputs.dueDate) - new Date())}</Text>
            <Button
              title='Edit'
              onPress={() => {
                setModalVisible(!modalVisible);
                setEditing(!editing);
              }}
            />
            <Button
              title='Close'
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </Modal>

        <Modal
          animationType='slide'
          style={styles.centeredView}
          transparent={true}
          visible={editing}
          onRequestClose={() => { setEditing(!editing); }}
        >
          <View style={styles.modalView}>
            <TextInput
              style={styles.textStyle}
              placeholder={inputs.title}
              onChangeText={(text) => editProps('title', text)}
            />
            <TextInput
              style={styles.textStyle}
              placeholder={inputs.description ? inputs.description : 'Description'}
              onChangeText={(text) => editProps('description', text)}
            />
            <TextInput
              style={styles.textStyle}
              placeholder={inputs.notes ? inputs.notes : 'Notes'}
              onChangeText={(text) => editProps('notes', text)}
            />
            <View style={{ width: '75%' }}>
              <Dropdown
                style={styles.dropdown}
                data={priorities}
                labelField="val"
                valueField="val"
                placeholder={inputs.priority}
                searchPlaceholder="Search..."
                maxHeight={300}
                onChange={item => {
                  editProps('priority', item.val);
                }}
              />
            </View>
            <View style={{ width: '75%' }}>
              <Dropdown
                style={styles.dropdown}
                data={categories}
                search={categories.length}
                labelField="label"
                valueField="value"
                placeholder={inputs.category}
                searchPlaceholder="Search..."
                maxHeight={300}
                onChange={item => {
                  editProps('category', item.value);
                }}
              />
            </View>
            <DateTimePicker
              value={due}
              mode='datetime'
              onChange={() => { editProps('dueDate', due.valueOf()); }}
            />
            <Button
              style={[styles.button, styles.buttonClose]}
              title='Save'
              onPress={() => {
                if (!edits.title)
                  edits.title = "Untitled Task";
                if (!edits.priority)
                  edits.priority = "None";
                //save edits
                setInputs(edits);
                newTasks = tasks;
                newTasks.set(props.keyVal, edits);
                setTask(newTasks);
                choosePriority();
                //switch modal
                setEditing(!editing);
                setModalVisible(!modalVisible);
                //apply filters to updated tasks
                applyFilter();
              }}
            />
            <Button
              style={[styles.button, styles.buttonClose]}
              title='Cancel'
              onPress={() => {
                editProps(inputs);
                setEditing(!editing);
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </Modal>
        <TouchableOpacity
          style={p}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.itemText}>{inputs.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  //DOCS Creates Modal to prompt for Task info
  const PromptTask = () => {
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
      setInputs({ 'dueDate': now });
      setDate(now);
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
            <View style={{ width: '75%' }}>
              <Dropdown
                style={styles.dropdown}
                data={priorities}
                labelField="val"
                valueField="val"
                placeholder={'Select priority'}
                searchPlaceholder="Search..."
                maxHeight={300}
                onChange={item => {
                  set('priority', item.val);
                }}
              />
            </View>
            <View style={{ width: '75%' }}>
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
                if (!inputs.title)
                  inputs.title = "Untitled Task";
                if (!inputs.priority)
                  inputs.priority = "None"
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
          onPress={() => { setModalVisible(true); reset(); }}
        />
      </View>
    )
  }

  //handles search bar
  const searchFilter = (text) => {
    setSearch(text);
    //BUG first search limits viewedTask and then second search filters from first search's results
    const filtered = viewedTasks.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setViewedTasks(filtered);
  };

  //creates new tasks to add to the view
  const addTask = (title, description, notes, priority, category, dueDate) => {
    //add task to map of all tasks
    let task = { title, description, notes, priority, category, dueDate, keyVal }
    let newTasks = tasks;
    newTasks.set(keyVal, task);
    setTask(newTasks);
    setKeyVal(keyVal + 1);
    //add task to map of incomplete tasks
    newTasks = incompleteTasks;
    newTasks.set(keyVal, task);
    setIncompleteTasks(newTasks);
    //apply filters to updated tasks
    applyFilter();
  };

  //task filters
  const titleFilter = (item1, item2) => {
    return item1.title.localeCompare(item2.title, undefined, { sensitivity: 'base' });
  }
  const courseFilter = (item) => {
    //if no course filter, display all tasks
    if (item == 'All') {
      setViewedTasks(Array.from(tasks.values()));
      return;
    }
    let newTasks = Array.from(tasks.values());
    newTasks = newTasks.filter(task => task.category == item);
    setViewedTasks(newTasks);
  }
  const dueFilter = (item1, item2) => {
    return item1.dueDate - item2.dueDate;
  }
  const priorityFilter = (item1, item2) => {
    const priorityOrder = {
      'High': 1,
      'Medium': 2,
      'Low': 3,
      'None': 4,
    };

    return priorityOrder[item1.priority] - priorityOrder[item2.priority];
  }
  
  var filter = dueFilter;
  const applyFilter = () => {
    newTasks = [...tasks.values()];
    newTasks = newTasks.slice().sort(filter);
    setViewedTasks(newTasks);
  }

  // TODO handles complete/incomplete task view
  const switchView = () => {
    setCompletePressed(!completePressed);
    setIncompletePressed(!incompletePressed);
    // if(completePressed)
    //   setViewedTasks([...completeTasks.values()]);
    // else
    //   setViewedTasks([...incompleteTasks.values()]);
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingBottom: 15 }}>
        <SearchBar
          inputContainerStyle={styles.searchBar}
          placeholder="Find Task"
          onChangeText={searchFilter}
          value={search}
        />
        <View style={styles.filterStyle}>
          <Dropdown
            style={[styles.dropdown, { flex: 1 }]}
            data={filters}
            labelField="label"
            valueField="label"
            placeholder={'Select filter'}
            maxHeight={300}
            onChange={(item) => {
              if (item.label == 'Title')
                filter = titleFilter;
              else if (item.label == 'Due date')
                filter = dueFilter;
              else if (item.label == 'Priority')
                filter = priorityFilter;
              else
                filter = dueFilter;
              applyFilter();
            }}
          />
          <Dropdown
            style={[styles.dropdown, { flex: 1 }]}
            data={[{ 'label': 'All', 'value': 'All' }, ...categories]}
            search={categories.length}
            labelField="label"
            valueField="label"
            placeholder={'All'}
            searchPlaceholder="Search..."
            maxHeight={300}
            onChange={item => {
              courseFilter(item.label);
            }}
          />
        </View>
        <View style={styles.prompt}>
          <PromptTask />
        </View>
        <ScrollView style={styles.tasksWrapper}>
          {
            viewedTasks.map((task, key) => (
              <CreateTask
                key={key}
                keyVal={task.keyVal}
                title={task.title}
                description={task.description}
                notes={task.notes}
                priority={task.priority}
                category={task.category}
                dueDate={task.dueDate}
              />
            ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.completionButton, incompletePressed && styles.selectedButton]}
          onPress={!incompletePressed && switchView}
        >
          <Text>Incomplete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.completionButton, completePressed && styles.selectedButton]}
          onPress={!completePressed && switchView}
        >
          <Text>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9370db',
    paddingBottom: 20,
  },
  prompt: {
    backgroundColor: '#585858',
    borderRadius: 25,
    marginHorizontal: '30%',
  },
  searchBar: {
    height: 30
  },
  tasksWrapper: {
    paddingHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    height: 50,
    paddingVertical: 10,
    backgroundColor: 'gray',
    borderRadius: 25,
    marginHorizontal: 20
  },
  completionButton: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  selectedButton: {
    backgroundColor: '#585858',
    borderRadius: 25
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
    marginVertical: '60%',
  },
  itemText: {
    fontWeight: 'bold',
  },
  filterStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    height: 30,
    paddingVertical: 10,
  },
  dropdown: {
    //flex: 1,
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  highPriorityItem: {
    backgroundColor: '#dc143c',
  },
  mediumPriorityItem: {
    backgroundColor: '#f69709',
  },
  lowPriorityItem: {
    backgroundColor: '#2eb82e',
  },
  noPriorityItem: {
    backgroundColor: '#818080',
  },
  item: {
    padding: 20,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 15,
  },
  taskCategory: {
    fontSize: 28,
    textAlign: 'center'
  },
  taskTitle: {
    fontSize: 24,
  },
  taskDescription: {
    textAlign: 'left',
    justifyContent: 'flex-start'
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
})