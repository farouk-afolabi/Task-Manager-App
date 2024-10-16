import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Email from 'react-native-email'; // Import email library

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);

  // Capture the task passed from AddTaskScreen
  useEffect(() => {
    if (route.params?.task) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Math.random().toString(), ...route.params.task },
      ]);
    }
  }, [route.params?.task]);

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const sendEmail = () => {
    const completedTasks = tasks.filter(task => task.completed);
    const emailBody = completedTasks.map(task => `${task.name}: ${task.description}`).join('\n');

    const to = ['recipient@example.com']; // Add recipient email address here

    Email(to, {
      subject: 'Completed Tasks',
      body: emailBody,
    }).then(() => {
      Alert.alert('Success', 'Email sent successfully!');
    }).catch(() => {
      Alert.alert('Error', 'Failed to send the email.');
    });
  };

  const allTasksCompleted = tasks.length > 0 && tasks.every(task => task.completed);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager - Farouk Afolabi </Text>
      <Button title="Add New Task" onPress={() => navigation.navigate('AddTaskScreen')} />

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>
              {item.name}: {item.description}
            </Text>
            <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
              <Text style={styles.completeButton}>
                {item.completed ? 'Undo' : 'Complete'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Render Send Email button if all tasks are completed */}
      {allTasksCompleted && (
        <Button title="Send Email" onPress={sendEmail} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  completeButton: {
    color: 'blue',
    marginLeft: 10,
  },
});

export default HomeScreen;
