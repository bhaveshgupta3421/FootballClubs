import React, { useState, useEffect, } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Picker,
} from 'react-native';
import { ListItem, } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import axios from 'axios';




const App = () => {
  const [selectedValue, setSelectedValue] = useState('-1');
  const [data, setData] = useState()
  const [load, setLoad] = useState(false)

  async function fetchData() {
    const res = await fetch('http://192.168.137.1:8080/');
    res
      .json()
      .then(res => setData(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    console.log(123456)
    fetchData();
  }, [load]);
  const postData = () => {
    axios.post('http://192.168.137.1:8080/', data)
      .then(res =>
        console.log(res))
      .catch(err => console.log(err))
    setLoad(!load)
  }
  let allStates = [
    {
      value: 'Assam',
    }, {
      value: 'Bihar',
    }, {
      value: 'Delhi',
    }, {
      value: 'Goa',
    }, {
      value: 'Gujarat',
    }, {
      value: 'Haryana',
    }, {
      value: 'Jammu and Kashmir',
    }, {
      value: 'Jharkhand',
    }, {
      value: 'Karnataka',
    }, {
      value: 'Kerela',
    }, {
      value: 'Chhattisgarh',
    }, {
      value: 'Madhya Pradesh',
    }, {
      value: 'Maharashtra',
    }, {
      value: 'Manipur',
    }, {
      value: 'Meghalaya',
    }, {
      value: 'Mizoram',
    }, {
      value: 'Nagaland',
    }, {
      value: 'Odisha',
    }, {
      value: 'Punjab',
    }, {
      value: 'Rajasthan',
    }, {
      value: 'Sikkim',
    }, {
      value: 'Tamil Nadu',
    }, {
      value: 'Telangana',
    }, {
      value: 'Uttar Pradesh',
    }, {
      value: 'West Bengal',
    }];

  const List = (props) => {
    if (props.code < 0) {
      return (
        <View>
          <Text>
            choose a state!!!
          </Text>
        </View>
      )
    } else {
      let list = data[props.code].clubs
      return list.map((l, i) => {
        let name = list[i]['clubName']
        let numLikes = list[i]['cnt']
        // console.log(list[i])
        return (
          <View >
            <ListItem
              friction={90} //
              activeScale={0.95} //
              title={name}
              subtitle={numLikes + ' Likes'}
              titleStyle={{ color: 'black', fontWeight: 'bold' }}
              chevron={
                <Icon
                  name={'heart-o'}
                  color={'red'}
                  size={17}
                  onPress={() => {
                    list[i]['cnt'] = numLikes + 1
                    postData()
                  }}
                />}
            />
          </View >
        )
      })
    }
  }
  return (
    <View style={{ flex: 1, padding: 40, backgroundColor: 'white' }}>
      <View>
        <Text style={{ fontSize: 27 }}>
          Football Clubs in India
          </Text>
      </View>
      <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Picker
          selectedValue={selectedValue}
          style={{ height: 40, width: 220, marginTop: 10 }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Choose" value="-1" />
          <Picker.Item label="Assam" value='0' />
          <Picker.Item label="Bihar" value="1" />
          <Picker.Item label="Delhi" value="2" />
          <Picker.Item label="Goa" value="3" />
          <Picker.Item label="Gujarat" value="4" />
          <Picker.Item label="Haryana" value="5" />
          <Picker.Item label="Jammu and Kashmir" value="6" />
          <Picker.Item label="Jharkhand" value="7" />
          <Picker.Item label="Karnataka" value="8" />
          <Picker.Item label="Kerela" value="9" />
          <Picker.Item label="Chhattisgarh" value="10" />
          <Picker.Item label="Madhya Pradesh" value="11" />
          <Picker.Item label="Maharashtra" value="12" />
          <Picker.Item label="Manipur" value="13" />
          <Picker.Item label="Meghalaya" value="14" />
          <Picker.Item label="Mizoram" value="15" />
          <Picker.Item label="Nagaland" value="16" />
          <Picker.Item label="Odisha" value="17" />
          <Picker.Item label="Punjab" value="18" />
          <Picker.Item label="Rajasthan" value="19" />
          <Picker.Item label="Sikkim" value="20" />
          <Picker.Item label="Tamil Nadu" value="21" />
          <Picker.Item label="Telangana" value="22" />
          <Picker.Item label="Uttar Pradesh" value="23" />
          <Picker.Item label="West Bengal" value="24" />
        </Picker>
        <View style={{ height: 20 }}>
          <Button title='Search' onPress={() => {
            fetchData()
          }} />
        </View>
      </View>
      <List code={selectedValue} />
    </View>
  );
};
export default App;