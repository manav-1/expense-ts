/* eslint-disable no-shadow */
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  GradientContainer,
  ExpenseInput,
  PaddedScrollViewContainer as PaddedContainer,
} from '../customComponents/styledComponents';
import {ProgressBar} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {App} from '../state/store';
import {UserIF} from '../state/store';
import {observer} from 'mobx-react';

const tempImage = require('../../assets/programmer.png');

const Profile = observer(() => {
  const [user, setUser] = React.useState<UserIF>();
  const [userName, setUserName] = React.useState<String>();
  const [userEmail, setUserEmail] = React.useState<String>();
  const [image, setImage] = React.useState<String | null>();
  const [isLoading, setIsLoading] = React.useState<Boolean>(false);

  React.useEffect(() => {
    (async () => {
      await App.loadUser();
      setUser(App.user);
      setUserName(App.user.userName);
      setUserEmail(App.user.userEmail);
      setImage(App.user.userProfilePic);
    })();
  }, []);
  const pickImage = async () => {
    let result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });

    if (!result.didCancel)
      if (result.assets && result.assets.length > 0)
        setImage(result.assets[0].base64);

    // uploadImage(result.uri);
  };
  const updateProfile = () => {
    setIsLoading(true);
    App.updateUser(
      {userName, userEmail, userProfilePic: image},
      String(user?.userId),
    );
    setIsLoading(false);
  };

  return (
    <GradientContainer>
      <View style={styles.tabStyles}>
        <Text style={styles.tabBarTitle}>Profile</Text>
      </View>
      <PaddedContainer>
        {isLoading ? (
          <ProgressBar progress={0.8} color="#f1c0cb" indeterminate />
        ) : null}
        <View style={styles.editImageContainer}>
          <Image
            source={
              image
                ? {
                    uri: `data:image/jpeg;base64,${image}`,
                  }
                : tempImage
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            onPress={pickImage}
            style={styles.editProfileButton}>
            <FontAwesome5 name="edit" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>Name</Text>
          <ExpenseInput
            value={userName}
            onChangeText={(val: string) => setUserName(val)}
            style={styles.expenseInput}
          />
          <Text style={styles.text}>Email</Text>
          <ExpenseInput
            value={userEmail}
            editable={false}
            style={styles.expenseInput}
          />

          <TouchableOpacity onPress={updateProfile} style={styles.saveButton}>
            <Text style={styles.saveText}>
              Save Profile&nbsp;&nbsp;
              <Ionicons name="save-outline" color="#000" size={16} />
            </Text>
          </TouchableOpacity>
          <View style={styles.alignSelf}>
            <Text style={[styles.text, styles.extraText]}>
              Account Created on
            </Text>
            <Text style={[styles.text, styles.extraText]}>
              {user ? new Date(String(user.createdAt)).toDateString() : null}
            </Text>
          </View>
        </View>
      </PaddedContainer>
    </GradientContainer>
  );
});
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontFamily: 'Karla-Regular',
    color: '#f1c0cb',
    marginHorizontal: 10,
    marginTop: 10,
  },
  expenseInput: {
    width: 200,
    borderBottomWidth: 1,
    borderBottomColor: '#ccf0fa',
    color: '#ccf0fa',
    borderRadius: 1,
    marginHorizontal: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#f1c0c0',
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    paddingVertical: 15,
    alignSelf: 'flex-end',
  },
  saveText: {
    color: '#000',
    fontFamily: 'Karla-Regular',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editProfileButton: {
    position: 'absolute',
    right: -5,
    bottom: -5,
    backgroundColor: '#fff',
    padding: 10,
    paddingLeft: 12,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraText: {fontSize: 16, textAlign: 'right', marginTop: 2},
  snackbar: {backgroundColor: '#f1c0cb', marginBottom: 80},
  snackBarText: {color: '#000'},
  editImageContainer: {position: 'absolute', right: 10, top: 10},
  tabBarTitle: {
    fontSize: 25,
    padding: 10,
    margin: 5,
    color: '#fff',
    fontFamily: 'Karla-Regular',
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
  alignSelf: {alignSelf: 'flex-end'},
});

export default Profile;
// import {Text} from 'react-native-paper';
// import React from 'react';

// export default function () {
//   return <Text>Profile Screen</Text>;
// }
