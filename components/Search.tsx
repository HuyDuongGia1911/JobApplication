import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Search = () => {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (!keyword) return;
    router.push(`/(events)/search?q=${keyword}` as any);


  };

  return (
    <View style={styles.searchbar}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm"
        value={keyword}
        onChangeText={setKeyword}
      />
      <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
        <Ionicons name="search" color={'white'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderRadius: 12,
    flex: 1,
    backgroundColor: '#F1F2F6',
    paddingHorizontal: 10,
  },
  btnSearch: {
    borderRadius: 12,
    backgroundColor: '#F27657',
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchbar: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
});
