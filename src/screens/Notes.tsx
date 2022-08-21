import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {
  GradientContainer,
  PaddedScrollViewContainer as PaddedContainer,
  ExpenseInput,
  CenteredKarlaText,
} from '../customComponents/styledComponents';
import DatePicker from 'react-native-neat-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';
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

  return (
    <>
      <GradientContainer>
        <View style={styles.tabStyles}>
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
