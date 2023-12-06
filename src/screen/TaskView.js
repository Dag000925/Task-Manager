import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, Modal, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SearchBar } from 'react-native-elements';
import PromptTask from './PromptTask';
import CreateTask from './CreateTask';
import { categories } from './Course';

const filters = [
  {'label': 'Title', 'value': 'Title'},
  {'label': 'Due date', 'value': 'Due date'},
  {'label': 'Priority', 'value': 'Priority'},
];

export default function TaskView() {
  //state variables
  const [tasks, setTask] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([...tasks]);
  const [incompletePressed, setIncompletePressed] = useState(true);
  const [completePressed, setCompletePressed] = useState(false);

  //IMPROVE general contains() search, maybe do search from start of title?
  //handles search bar
  const searchFilter = (text) => {
    setSearch(text);
    const filtered = tasks.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  //creates new tasks to add to the view
  const addTask = (title, description, notes, priority, category, dueDate) => {
    newTasks = [...tasks, { title, description, notes, priority, category, dueDate }];
    setTask(newTasks);
    setFilteredTasks(newTasks);
  };

  //task filters
  const titleFilter = (item1, item2) => {
    return item1.title.localeCompare(item2.title, undefined, {sensitivity: 'base'});
  }
  const courseFilter = (item) => {
    //if no course filter, display all tasks
    if(item == 'All')
    {
      setFilteredTasks(tasks);
      return;
    }
    newTasks = tasks;
    newTasks = newTasks.filter(task => task.category == item);
    setFilteredTasks(newTasks);
  }
  const dueFilter = (item1, item2) => {
    return item1.dueDate - item2.dueDate;
  }
  const priorityFilter = (item1, item2) => {
    const priorityOrder = {
      'high': 1,
      'medium': 2,
      'low': 3,
      'none': 4,
    };

    return priorityOrder[item1.priority] - priorityOrder[item2.priority];
  }
  var filter = dueFilter;
  const applyFilter = () => {
    newTasks = tasks;
    newTasks = newTasks.slice().sort(filter);
    setFilteredTasks(newTasks);
  }

  // TODO handles complete/incomplete task view
  const switchView = () => {
    setCompletePressed(!completePressed);
    setIncompletePressed(!incompletePressed);
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, paddingBottom: 15}}>
        <SearchBar
          inputContainerStyle={styles.searchBar}
          placeholder="Find Task"
          onChangeText={searchFilter}
          value={search}
          />
        <View style={styles.filterStyle}>
          <Dropdown 
            style={styles.dropdown}
            data={filters}
            labelField="label"
            valueField="label"
            placeholder={'Select filter'}
            maxHeight={300}
            onChange={(item) => {
              if(item.value == 'Title')
                filter = titleFilter;
              else if(item.value == 'Due date')
                filter = dueFilter;
              else if(item.value == 'Priority')
                filter = priorityFilter;
              else
                filter = dueFilter;
              applyFilter();
            }}
          />
          <Dropdown 
            style={styles.dropdown}
            data={categories}
            search={categories.length}
            labelField="label"
            valueField="label"
            placeholder={categories.length ? 'Select course' : 'No courses'}
            searchPlaceholder="Search..."
            maxHeight={300}
            onChange={item => {
              courseFilter(item.label);
            }}
          />
        </View>
        <View style={styles.prompt}>
          <PromptTask addTask={addTask} />
        </View>
        <ScrollView style={styles.tasksWrapper}>
          {filteredTasks.map((task, key) => (
            <CreateTask
              key={key}
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
    paddingBottom: 20
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
    flex: 1,
    height: 30,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
})