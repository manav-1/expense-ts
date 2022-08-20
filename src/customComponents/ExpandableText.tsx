import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const ExpandableText = ({
  text,
  customStyle,
  value,
}: {
  text: String;
  customStyle?: any;
  value?: String;
}) => {
  const [nLines, setNLines] = React.useState(false);
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        style={[styles.noteText, customStyle]}
        numberOfLines={nLines ? 0 : 1}
        onPress={() => setNLines(!nLines)}>
        {text.toString()}
      </Text>
      {value ? (
        <Text style={[styles.noteValue, customStyle]}>{value}</Text>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  noteText: {
    fontFamily: 'NotoSansMono-Regular',
    fontSize: 18,
    width: '60%',
    color: '#fff',
    marginVertical: 15,
    paddingVertical: 7,
  },
  noteValue: {
    fontFamily: 'NotoSansMono-Regular',
    fontSize: 18,
    color: '#fff',
  },
});

export default ExpandableText;
