import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Load tasks from AsyncStorage when app starts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.log('Error loading tasks', error);
    }
  };

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasksToSave));
    } catch (error) {
      console.log('Error saving tasks', error);
    }
  };

  const addTask = () => {
    if (task.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    const newTasks = [...tasks, { id: Date.now().toString(), text: task, completed: false }];
    setTasks(newTasks);
    setTask('');
    saveTasks(newTasks);
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(t => t.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButton}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Demo App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ddfbffff', // soft modern background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#00796b',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#b2dfdb', // stylish background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 18,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    fontSize: 20,
    color: '#e53935',
    padding: 5,
  },
});
