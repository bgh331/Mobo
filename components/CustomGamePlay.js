import React from 'react';
import { View, Text, Button, Alert, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonWithBackground from './shared/newbutton'

export default function CustomGamePlay({route, navigation}) {

    const {deck_number} = route.params;
    
    

    const [id, setId] = React.useState(" ");

    const [data, setData] = React.useState('');
    const [count, setCount] = React.useState('');
    const [value, setValue] = React.useState(' ');

    const styles = StyleSheet.create({
        main: {

            flex: 1,
            backgroundColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
        },

        tinyLogo: {
            width: 260,
            height: 360,
        }
    });
  
    const createDeck = async () => {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count='+ deck_number );
      const json = await response.json();
      setId(json.deck_id);
     

      
      const response2 = await fetch('https://deckofcardsapi.com/api/deck/' + id + '/draw/?count=1');
      const json2 = await response2.json();
      setData(json2.cards);

      setValue(json2.cards[0].value)
     
      setCount(json.remaining);
      
    }

 

    const buttonpressed = async () => {

        const response = await fetch('https://deckofcardsapi.com/api/deck/' + id + '/draw/?count=1');
        const json = await response.json();
        setData(json.cards);
        setCount(json.remaining);
        setValue(json.cards[0].value)

    }

    const [info, setInfo] = React.useState('');

    const CardChecking = (props) => {
        if (props == 'ACE') {
            setInfo("Waterfall")
        }
        else if (props == '2') {
            setInfo("Two for YOU!")
        }
        else if (props == '3') {
            setInfo("Three for me!")
        }
        else if (props == '4') {    
                setInfo("FLOOR!")
        }
        else if (props == '5') {  
                setInfo("Five For Guys!")   
        }
        else if (props == '6') {   
                setInfo("Six for Chicks!")   
        }
        else if (props == '7') {
            setInfo("Heaven!")
        }
        else if (props == '8') {
            setInfo("You get a Mate!")
        }
        else if (props == '9') {
            setInfo("Make up a Rule.")
        }
        else if (props == '10') {
            setInfo("Category")
        }
        else if (props == 'JACK') {
            setInfo("Rythm")
        }
        else if (props == 'QUEEN') {
            setInfo("Question Master")
        }
        else if (props == 'KING') {
            setInfo("Never have I ever.")
        }
    }

    return (

        <SafeAreaView style={styles.main}>
            <ButtonWithBackground color='yellow' text="Start Game" onPress={ () => { createDeck(); CardChecking() }}/>
    <Text>{deck_number}</Text>
            <Text style={{fontSize: 16, color:'white'}}>Cards Remaining {count}</Text>
            <Text></Text>
            
            <FlatList data={data} renderItem=
                {({ item }) =>
                    <View>

                        <Image source={{ uri: item.image }} style={styles.tinyLogo} />
                        <Text> </Text>


                        <Text style={{fontSize: 16, color:'white', textAlign:'center'}} >{info}</Text>
                        <Text>{CardChecking(item.value)}</Text>
                        <Button title="Next Card" onPress onPress={() => { buttonpressed(); CardChecking()}
                        }></Button>
                        <Text></Text>

                    </View>}
                keyExtractor={(_, index) => index.toString()
                }
            />


        </SafeAreaView>
    );


}