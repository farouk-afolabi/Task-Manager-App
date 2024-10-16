import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AddTaskScreen({ navigation }) {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() && taskDescription.trim()) {
      // Navigate back to HomeScreen and pass the new task as a parameter
      navigation.navigate('HomeScreen', {
        task: { name: taskName, description: taskDescription, completed: false },
      });

      // Clear input fields after adding
      setTaskName('');
      setTaskDescription('');

      // Show success alert
      Alert.alert('Task Added', `Task: ${taskName} - ${taskDescription}`);
    } else {
      Alert.alert('Input Error', 'Please enter both task name and description.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        onChangeText={setTaskName}
        value={taskName}
      />
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        onChangeText={setTaskDescription}
        value={taskDescription}
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 8,
  },
});
