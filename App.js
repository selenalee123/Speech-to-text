
// // Text to Speech Conversion with Natural Voices in React Native
// // import slider for the tuning of pitch and speed
// import Slider from '@react-native-community/slider';
// import React,  { Component, useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
//   SafeAreaView,
//   TextInput,Keyboard,TouchableOpacity,FlatList
// } from 'react-native';


// // import Tts Text to Speech
// import Tts from 'react-native-tts';

// const App = () => {
//   const [voices, setVoices] = useState([]);
//   const [ttsStatus, setTtsStatus] = useState('initiliazing');
//   const [selectedVoice, setSelectedVoice] = useState(null);
//   const [speechRate, setSpeechRate] = useState(0.5);
//   const [speechPitch, setSpeechPitch] = useState(1);
//   const [
//     text,
//     setText
//   ] = useState('Enter Text like Hello About React');

//   useEffect(() => {
//     Tts.addEventListener(
//       'tts-start',
//       (_event) => setTtsStatus('started')
//     );
//     Tts.addEventListener(
//       'tts-finish',
//       (_event) => setTtsStatus('finished')
//     );
//     Tts.addEventListener(
//       'tts-cancel',
//       (_event) => setTtsStatus('cancelled')
//     );
//     Tts.setDefaultRate(speechRate);
//     Tts.setDefaultPitch(speechPitch);
//     Tts.getInitStatus().then(initTts);
//     return () => {
//       Tts.removeEventListener(
//         'tts-start',
//         (_event) => setTtsStatus('started')
//       );
//       Tts.removeEventListener(
//         'tts-finish',
//         (_event) => setTtsStatus('finished'),
//       );
//       Tts.removeEventListener(
//         'tts-cancel',
//         (_event) => setTtsStatus('cancelled'),
//       );
//     };
//   }, []);

//   const initTts = async () => {
//     const voices = await Tts.voices();
//     const availableVoices = voices
//       .filter((v) => !v.networkConnectionRequired && !v.notInstalled)
//       .map((v) => {
//         return {id: v.id, name: v.name, language: v.language};
//       });
//     let selectedVoice = null;
//     if (voices && voices.length > 0) {
//       selectedVoice = voices[0].id;
//       try {
//         await Tts.setDefaultLanguage(voices[0].language);
//       } catch (err) {
//         //Samsung S9 has always this error:
//         //"Language is not supported"
//         console.log(`setDefaultLanguage error `, err);
//       }
//       await Tts.setDefaultVoice(voices[0].id);
//       setVoices(availableVoices);
//       setSelectedVoice(selectedVoice);
//       setTtsStatus('initialized');
//     } else {
//       setTtsStatus('initialized');
//     }
//   };

//   const readText = async () => {
//     Tts.stop();
//     Tts.speak(text);
//   };

//   const updateSpeechRate = async (rate) => {
//     await Tts.setDefaultRate(rate);
//     setSpeechRate(rate);
//   };

//   const updateSpeechPitch = async (rate) => {
//     await Tts.setDefaultPitch(rate);
//     setSpeechPitch(rate);
//   };

//   const onVoicePress = async (voice) => {
//     try {
//       await Tts.setDefaultLanguage(voice.language);
//     } catch (err) {
//       // Samsung S9 has always this error:
//       // "Language is not supported"
//       console.log(`setDefaultLanguage error `, err);
//     }
//     await Tts.setDefaultVoice(voice.id);
//     setSelectedVoice(voice.id);
//   };

//   const renderVoiceItem = ({item}) => {
//     return (
//       <TouchableOpacity
//         style={{
//           backgroundColor: selectedVoice === item.id ?
//           '#DDA0DD' : '#5F9EA0',
//         }}
//         onPress={() => onVoicePress(item)}>
//         <Text style={styles.buttonTextStyle}>
//           {`${item.language} - ${item.name || item.id}`}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>
//         <Text style={styles.titleText}>
//           Text to Speech Conversion with Natural Voices
//         </Text>
//         <View style={styles.sliderContainer}>
//           <Text style={styles.sliderLabel}>
//             {`Speed: ${speechRate.toFixed(2)}`}
//           </Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0.01}
//             maximumValue={0.99}
//             value={speechRate}
//             onSlidingComplete={updateSpeechRate}
//           />
//         </View>
//         <View style={styles.sliderContainer}>
//           <Text style={styles.sliderLabel}>
//             {`Pitch: ${speechPitch.toFixed(2)}`}
//           </Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0.5}
//             maximumValue={2}
//             value={speechPitch}
//             onSlidingComplete={updateSpeechPitch}
//           />
//         </View>
//         <Text style={styles.sliderContainer}>
//           {`Selected Voice: ${selectedVoice || ''}`}
//         </Text>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={(text) => setText(text)}
//           value={text}
//           onSubmitEditing={Keyboard.dismiss}
//         />
//         <TouchableOpacity
//           style={styles.buttonStyle}
//           onPress={readText}>
//           <Text style={styles.buttonTextStyle}>
//             Click to Read Text ({`Status: ${ttsStatus || ''}`})
//           </Text>
//         </TouchableOpacity>
//         <Text style={styles.sliderLabel}>
//           Select the Voice from below
//         </Text>
//         <FlatList
//           style={{width: '100%', marginTop: 5}}
//           keyExtractor={(item) => item.id}
//           renderItem={renderVoiceItem}
//           extraData={selectedVoice}
//           data={voices}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     padding: 5,
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   buttonStyle: {
//     justifyContent: 'center',
//     marginTop: 15,
//     padding: 10,
//     backgroundColor: '#8ad24e',
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   sliderContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 300,
//     padding: 5,
//   },
//   sliderLabel: {
//     textAlign: 'center',
//     marginRight: 20,
//   },
//   slider: {
//     flex: 1,
//   },
//   textInput: {
//     borderColor: 'gray',
//     borderWidth: 1,
//     color: 'black',
//     width: '100%',
//     textAlign: 'center',
//     height: 40,
//   },
// });







// import all the components we are going to use


import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-community/voice';

type Props = {};
type State = {
  recognized: string;
  pitch: string;
  error: string;
  end: string;
  started: string;
  results: string[];
  partialResults: string[];
};

class VoiceTest extends Component<Props, State> {
  state = {
    recognized: '',
    pitch: '',
    error: '',
    end: '',
    started: '',
    results: [],
    partialResults: [],
  };

  constructor(props: Props) {
    super(props);
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = this.onSpeechResults;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = this.onSpeechVolumeChanged;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    this.setState({
      recognized: '√',
    });
  };

  onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    this.setState({
      end: '√',
    });
  };

  onSpeechError = (e: SpeechErrorEvent) => {
    console.log('onSpeechError: ', e);
    this.setState({
      error: JSON.stringify(e.error),
    });
  };

  onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  };

  onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    this.setState({
      partialResults: e.value,
    });
  };

  onSpeechVolumeChanged = (e: any) => {
    console.log('onSpeechVolumeChanged: ', e);
    this.setState({
      pitch: e.value,
    });
  };

  _startRecognizing = async () => {
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });

    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    this.setState({
      recognized: '',
      pitch: '',
      error: '',
      started: '',
      results: [],
      partialResults: [],
      end: '',
    });
  };



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Kim Kim Voice</Text>
        <Text style={styles.instructions}>
          Press the button and start speaking.
        </Text>
        <Text style={styles.stat}>{`Started: ${this.state.started}`}</Text>
        <Text style={styles.stat}>{`Recognized: ${
          this.state.recognized
        }`}</Text>
        <Text style={styles.stat}>{`Pitch: ${this.state.pitch}`}</Text>
        <Text style={styles.stat}>{`Error: ${this.state.error}`}</Text>
        <Text style={styles.stat}>Results</Text>
        {this.state.results.map((result, index) => {
          return (
            <Text key={`result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>Partial Results</Text>
        {this.state.partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`} style={styles.stat}>
              {result}
            </Text>
          );
        })}
        <Text style={styles.stat}>{`End: ${this.state.end}`}</Text>
        <TouchableHighlight onPress={this._startRecognizing}>
          <Image style={styles.button} source={require('./assets/button.png')} />
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text style={styles.action}>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text style={styles.action}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text style={styles.action}>Destroy</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    textAlign: 'center',
    color: '#0000FF',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
  },
});

export default VoiceTest;

