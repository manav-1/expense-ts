/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  GradientContainer,
  PaddedScrollViewContainer as PaddedContainer,
  ExpenseInput,
  CenteredKarlaText,
} from '../customComponents/styledComponents';
// import DatePicker from 'react-native-datepicker';
import DatePicker from 'react-native-neat-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';
import CustomNote from '../customComponents/CustomNote';
import {snackbar} from '../state/snackbar';
import {App, NoteIF} from '../state/store';
import {observer} from 'mobx-react';

const Notes = observer(() => {
  const [date, setDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = React.useState('');
  const [notes, setNotes] = React.useState<NoteIF[]>();
  const [notesVisible, setNotesVisible] = React.useState(false);

  React.useEffect(() => {
    App.loadNotes();
    setNotes(App.notes);
  }, []);

  // const fetchData = () => {
  //   const userId = auth().currentUser.uid;
  //   database()
  //     .ref(userId)
  //     .child('/notes/')
  //     .on('value', data => {
  //       if (data.val()) {
  //         let values = {...data.val()};
  //         let notes = [];
  //         for (let key in values) {
  //           values[key].key = key;
  //           values[key].index = notes.length;
  //           notes.push(values[key]);
  //         }
  //         setNotes(notes);
  //       } else {
  //         setNotes([]);
  //       }
  //     });
  // };

  // React.useEffect(() => {
  //   setUser(auth().currentUser);
  //   fetchData();
  //   return () => {
  //     database().ref(auth().currentUser.userId).child('/notes/').off();
  //   };
  // }, []);

  const handleNewNote = () => {
    const values = {date: date, noteText: note};
    const validationSchema = Yup.object({
      date: Yup.date().required('Date is required'),
      noteText: Yup.string().required('Note is required'),
    });
    validationSchema
      .validate(values)
      .then(() => {
        App.addNote(values);
        snackbar.openSnackBar('Added Successfully');
        setNote('');
        setDate(new Date());
        setNotesVisible(false);
      })
      .catch(error => {
        snackbar.openSnackBar(error.message);
      });
    setNotesVisible(false);
  };
  // const addNote = item => {
  //   database().ref(`/${user.uid}/notes/`).push(item);
  //   fetchData();
  // };
  // const deleteNote = index => {
  //   database().ref(`/${user.uid}/notes/`).child(notes[index].key).remove();
  // };

  return (
    <>
      <GradientContainer>
        <View
          // colors={['#153759AA', '#fff']}
          style={styles.tabStyles}>
          <Text style={styles.tabBarTitle}>Notes</Text>
          <TouchableOpacity
            style={[styles.logoutButton, {paddingLeft: 0}]}
            onPress={() => setNotesVisible(!notesVisible)}>
            {!notesVisible ? (
              <Ionicons name="add" color="#fff" size={25} />
            ) : (
              <Ionicons name="close" color="#fff" size={25} />
            )}
          </TouchableOpacity>
        </View>
        <PaddedContainer>
          {notesVisible ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ExpenseInput
                placeholder="Enter note Text"
                placeholderTextColor="#fff5"
                style={{
                  width: 230,
                  borderBottomWidth: 1,
                  color: '#f2f2f2',
                }}
                value={note}
                onChangeText={setNote}
              />
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Text
                  style={{
                    color: '#f2f2f2',
                    fontFamily: 'Karla-Regular',
                  }}>
                  {date.toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: '#ffc290',
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={handleNewNote}>
                <CenteredKarlaText>
                  Save <Ionicons name="save-outline" size={14} />
                </CenteredKarlaText>
              </TouchableOpacity>
              <DatePicker
                isVisible={open}
                mode={'single'}
                onConfirm={(date: any) => {
                  setOpen(false);
                  setDate(date.date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          ) : null}
          {notes?.map(note => (
            <CustomNote
              key={String(note.noteId)}
              note={note}
              deleteNote={() => App.deleteNote(String(note.noteId))}
            />
          ))}
        </PaddedContainer>
      </GradientContainer>
    </>
  );
});
const styles = StyleSheet.create({
  tabBarTitle: {
    fontSize: 25,
    padding: 10,
    margin: 5,
    color: '#fff',
    fontFamily: '',
  },
  tabStyles: {
    // borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#181824',
  },
  logoutButton: {
    marginRight: 10,
    paddingLeft: 5,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#494c59',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Notes;

// import {Text} from 'react-native-paper';
// import React from 'react';

// export default function () {
//   <Text>Notes</Text>;
// }
