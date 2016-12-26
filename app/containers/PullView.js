import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions
} from 'react-native';

import {PullView} from '../components/pullable';

export default class extends Component {

	constructor(props) {
        super(props);
        this.state = {refreshing: false};
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    onPullRelease(resolve) {
		//do something
		setTimeout(() => {
            resolve();
        }, 3000);
    }

	topIndicatorRender(pulling, pullok, pullrelease) {
		return <View style={{flexGrow: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
		  <ActivityIndicator size="small" color="gray" />
		  {pulling ? <Text>下拉刷新pulling...</Text> : null}
		  {pullok ? <Text>松开刷新pullok......</Text> : null}
		  {pullrelease ? <Text>玩命刷新中pullrelease......</Text> : null}
		</View>;
	}

  render() {
    return (
      <View style={[styles.container]}>
    		<PullView style={{width: Dimensions.get('window').width}} onPullRelease={this.onPullRelease} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}>
    			<View style={{backgroundColor: '#eeeeee'}}>
            <Text>1</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
            <Text>7</Text>
            <Text>8</Text>
            <Text>9</Text>
            <Text>10</Text>
            <Text>11</Text>
            <Text>12</Text>
            <Text>13</Text>
            <Text>14</Text>
            <Text>15</Text>
            <Text>1***************</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
            <Text>7</Text>
            <Text>8</Text>
            <Text>9</Text>
            <Text>10</Text>
            <Text>11</Text>
            <Text>12</Text>
            <Text>13</Text>
            <Text>14</Text>
            <Text>15</Text>
            <Text>1***************</Text>
            <Text>2</Text>
            <Text>3</Text>
            <Text>4</Text>
            <Text>5</Text>
            <Text>6</Text>
            <Text>7</Text>
            <Text>8</Text>
            <Text>9</Text>
            <Text>10</Text>
            <Text>11</Text>
            <Text>12</Text>
            <Text>13</Text>
            <Text>14</Text>
            <Text>15</Text>
          </View>
        </PullView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
