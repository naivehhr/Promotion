import React, { Component } from 'react';
import {
  View,
  ART,
  StyleSheet
} from 'react-native';
const {Surface, Shape, Path} = ART;

// https://github.com/naivehhr/React-Native-ART-Sample
class ArtTest extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Circle />
      </View>
    );
  }
}

class Line extends Component {
  render(){
    const path = ART.Path();
    path.moveTo(1,1); //将起始点移动到(1,1) 默认(0,0)
    path.lineTo(300,1); //连线到目标点(300,1)
    return(
      <View style={this.props.style}>
        <ART.Surface width={300} height={2}>
          <ART.Shape d={path} stroke="#000000" strokeWidth={2} />
        </ART.Surface>
      </View>
    )
  }
}


class Circle extends Component {
  render(){
    const path = new Path()
             .moveTo(50,1)
             .arc(0,99,25)
             .arc(0,-99,25)
             .close();


         return(
             <View style={this.props.style}>
                 <Surface width={100} height={100}>
                     <Shape d={path} stroke="#000000" strokeWidth={1}/>
                 </Surface>
             </View>
         )
  }
}



const styles = StyleSheet.create({
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = ArtTest
