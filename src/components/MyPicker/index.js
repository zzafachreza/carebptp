import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <View style={{
      // borderWidth: 1,
      // margin: 5,
      borderColor: colors.primary
    }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,

        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      {label2 && (
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: 12,
            marginVertical: 1,
            ...styleLabel,
          }}>
          {label2}
        </Text>
      )}
      <Picker multiline={true}
        numberOfLines={2} selectedValue={value} onValueChange={onValueChange}>
        {data.map(item => {
          return <Picker.Item multiline={true}
            numberOfLines={2} value={item.value} label={item.label} />;
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({});
